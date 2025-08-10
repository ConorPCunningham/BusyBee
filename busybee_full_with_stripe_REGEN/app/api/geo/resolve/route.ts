import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const SAMPLES: Record<string, { lat:number; lng:number; label:string }> = {
  dublin: { lat: 53.3498, lng: -6.2603, label: 'Dublin, IE' },
  london: { lat: 51.5074, lng: -0.1278, label: 'London, UK' },
  belfast: { lat: 54.5973, lng: -5.9301, label: 'Belfast, UK' },
  cork: { lat: 51.8985, lng: -8.4756, label: 'Cork, IE' },
  galway: { lat: 53.2707, lng: -9.0568, label: 'Galway, IE' },
};

export async function GET(req: NextRequest){
  const qRaw = (req.nextUrl.searchParams.get('q') || '').trim();
  if (!qRaw) return NextResponse.json({ error: 'missing_query' }, { status: 400 });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const rl = rateLimit(`geo:${ip}`, 30, 60_000);
  if (!rl.ok) return NextResponse.json({ error: 'rate_limited', retryAfterMs: rl.resetAt - Date.now() }, { status: 429 });

  const token = process.env.MAPBOX_TOKEN;
  const q = encodeURIComponent(qRaw);
  const countriesParam = (req.nextUrl.searchParams.get('countries') || 'ie,gb').toLowerCase();
  const countries = countriesParam.split(',').map(s=> s.trim()).filter(Boolean).join(',');
  const proxLat = req.nextUrl.searchParams.get('lat');
  const proxLng = req.nextUrl.searchParams.get('lng');
  const proxParam = (proxLat && proxLng) ? `&proximity=${Number(proxLng)},${Number(proxLat)}` : '';

  if (token){
    try{
      const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${q}.json?limit=1&types=place,postcode,address,locality&language=en&countries=${countries}${proxParam}&access_token=${token}`;
      const r = await fetch(url, { next: { revalidate: 3600 } });
      if (r.ok){
        const d = await r.json();
        const feat = d?.features?.[0];
        if (feat && Array.isArray(feat.center) && feat.center.length >= 2){
          const [lng, lat] = feat.center;
          const label = feat.place_name || qRaw;
          return NextResponse.json({ ok: true, lat, lng, label });
        }
      }
    }catch{/* fall through to samples */}
  }

  const key = qRaw.toLowerCase();
  if (SAMPLES[key]) return NextResponse.json({ ok: true, ...SAMPLES[key] });
  const contains = Object.keys(SAMPLES).find(k => key.includes(k));
  if (contains) return NextResponse.json({ ok: true, ...SAMPLES[contains] });

  if (/^[A-Za-z]\d{1,2}[A-Za-z]?\s?\d[A-Za-z0-9]{2}$/.test(key)) {
    return NextResponse.json({ ok: true, lat: 53.3498, lng: -6.2603, label: `Approx for ${qRaw.toUpperCase()}` });
  }
  return NextResponse.json({ error: 'not_found' }, { status: 404 });
}
