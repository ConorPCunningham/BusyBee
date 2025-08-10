"use client";
import React from 'react';
export default function HelperAvailabilityToggle(){
  const [loading, setLoading] = React.useState(true);
  const [status, setStatus] = React.useState<'ONLINE'|'OFFLINE'|'BUSY'>('OFFLINE');
  const [capacity, setCapacity] = React.useState(1);
  const [err, setErr] = React.useState<string | null>(null);
  const [shareLoc, setShareLoc] = React.useState(false);
  const [lat, setLat] = React.useState<number | null>(null);
  const [lng, setLng] = React.useState<number | null>(null);
  React.useEffect(()=>{ (async()=>{ try{ const r=await fetch('/api/helpers/me/availability'); const d=await r.json(); if(r.ok && d.presence){ setStatus(d.presence.status); setCapacity(d.presence.capacity||1); } }catch{} finally{ setLoading(false); } })(); }, []);
  React.useEffect(()=>{ if(status==='OFFLINE') return; let mounted=true; let t:any;
    async function beat(){ try{ const body:any={status,capacity}; if(shareLoc&&lat!=null&&lng!=null){ body.lat=lat; body.lng=lng; } await fetch('/api/availability/heartbeat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); }catch{} finally{ if(mounted) t=setTimeout(beat,60000);} }
    beat(); return ()=>{ mounted=false; clearTimeout(t); };
  },[status,capacity,shareLoc,lat,lng]);
  React.useEffect(()=>{ if(!shareLoc) return; if(navigator?.geolocation){ navigator.geolocation.getCurrentPosition((p)=>{ setLat(p.coords.latitude); setLng(p.coords.longitude); }, ()=>{}, { enableHighAccuracy:false, maximumAge:300000, timeout:5000 }); } },[shareLoc]);
  async function save(partial: Partial<{ status:'ONLINE'|'OFFLINE'|'BUSY'; capacity:number }>){ setErr(null); setLoading(true);
    try{ const r=await fetch('/api/helpers/me/availability',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({status,capacity,...partial})}); const d=await r.json(); if(!r.ok) throw new Error(d?.error||'failed'); if(partial.status) setStatus(partial.status); if(typeof partial.capacity==='number') setCapacity(partial.capacity); }catch(ex:any){ setErr(ex?.message||'failed'); } finally{ setLoading(false); } }
  return (<div className="rounded-2xl border bg-white p-4 space-y-3 text-sm">
    <div className="flex items-center gap-2"><span className="font-medium">Your availability</span>
      <span className={`rounded-md px-2 py-0.5 text-xs border ${status==='ONLINE'?'bg-emerald-50 border-emerald-200 text-emerald-800':status==='BUSY'?'bg-amber-50 border-amber-200 text-amber-800':'bg-gray-50 border-gray-200 text-gray-700'}`}>{status}</span></div>
    <div className="flex flex-wrap items-center gap-2">
      <button onClick={()=>save({status:'ONLINE'})} className="rounded-md border px-2 py-1">Go online</button>
      <button onClick={()=>save({status:'BUSY'})} className="rounded-md border px-2 py-1">Busy</button>
      <button onClick={()=>save({status:'OFFLINE'})} className="rounded-md border px-2 py-1">Go offline</button>
      <div className="ml-auto flex items-center gap-2"><label>Capacity</label><input type="number" min={1} max={5} value={capacity} onChange={e=>setCapacity(Number(e.target.value))} className="w-16 rounded-md border px-2 py-1" /><button onClick={()=>save({capacity})} className="rounded-md border px-2 py-1">Save</button></div>
    </div>
    <div className="flex items-center gap-2 text-xs"><input id="shareloc" type="checkbox" checked={shareLoc} onChange={(e)=>setShareLoc(e.target.checked)} className="h-4 w-4" /><label htmlFor="shareloc">Share rough location for better matching (optional)</label></div>
    {err && <div className="text-red-600">{err}</div>}
    <div className="text-xs text-gray-500">Your location is only used coarsely when you send a heartbeat. You can stay online without sharing precise location.</div>
  </div>);
}
