"use client";
import React from 'react';
export default function AvailableHelpersBadge({ lat, lng, radiusKm = 10 }:{ lat:number; lng:number; radiusKm?: number }){
  const [loading, setLoading] = React.useState(true);
  const [count, setCount] = React.useState<{ available:number; busy:number }|null>(null);
  const [heat, setHeat] = React.useState<'LOW'|'MEDIUM'|'HIGH'|null>(null);
  React.useEffect(()=>{ (async()=>{
    try{ const r=await fetch(`/api/availability/heat?lat=${lat}&lng=${lng}&radius=${radiusKm}`); const d=await r.json();
      if(r.ok && d.cells){ const available=d.cells.reduce((s:number,c:any)=>s+(c.available||0),0), busy=d.cells.reduce((s:number,c:any)=>s+(c.busy||0),0);
        setCount({available,busy}); const total=available+busy; if(total>=10) setHeat('HIGH'); else if(total>=5) setHeat('MEDIUM'); else setHeat('LOW'); }
    }catch{} finally{ setLoading(false); }
  })(); }, [lat,lng,radiusKm]);
  const heatColor = heat==='HIGH' ? 'bg-emerald-500' : heat==='MEDIUM' ? 'bg-amber-500' : 'bg-gray-400';
  const heatLabel = heat ? `${heat} activity` : '';
  return (<div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-xs" role="status" aria-live="polite">
    <span className={`inline-flex h-2 w-2 rounded-full ${heatColor}`} aria-hidden="true"></span>
    {loading ? 'Checking helpers nearby…' : `${count?.available ?? 0} available, ${count?.busy ?? 0} busy in ~${radiusKm}km (${heatLabel})`}
  </div>);
}
