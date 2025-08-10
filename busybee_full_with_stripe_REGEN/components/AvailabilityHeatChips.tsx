"use client";
import React from 'react';
function Chip({ level, count }:{ level:'low'|'med'|'high'; count:number }){
  const cls = level==='high' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : level==='med' ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-gray-50 border-gray-200 text-gray-700';
  const label = level==='high' ? 'High' : level==='med' ? 'Medium' : 'Low';
  return <span className={`rounded-full border px-2 py-0.5 text-xs ${cls}`}>{label} · {count}</span>;
}
export default function AvailabilityHeatChips({ lat, lng, radiusKm=10 }:{ lat:number; lng:number; radiusKm?: number }){
  const [cells, setCells] = React.useState<{ id:string; lat:number; lng:number; available:number; busy:number; level:'low'|'med'|'high' }[]|null>(null);
  React.useEffect(()=>{ (async()=>{ try{ const r=await fetch(`/api/availability/heat?lat=${lat}&lng=${lng}&radius=${radiusKm}`); const d=await r.json(); if(r.ok) setCells(d.cells||[]); }catch{} })(); }, [lat,lng,radiusKm]);
  if (!cells) return <div className="text-xs text-gray-500">Checking availability…</div>;
  if (!cells.length) return <div className="text-xs text-gray-500">No helpers nearby right now — try posting anyway or schedule a time.</div>;
  const totals = cells.reduce((acc: any, c)=>{ acc[c.level] = (acc[c.level]||0) + c.available; return acc; }, {} as any);
  return (<div className="flex flex-wrap items-center gap-2 text-xs">
    {totals.high ? <Chip level="high" count={totals.high} /> : null}
    {totals.med ? <Chip level="med" count={totals.med} /> : null}
    {!totals.high && !totals.med ? <Chip level="low" count={totals.low||0} /> : null}
    <span className="text-gray-500">in ~{radiusKm}km</span>
  </div>);
}
