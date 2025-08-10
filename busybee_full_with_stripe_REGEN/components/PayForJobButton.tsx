"use client";
import React from 'react';
export default function PayForJobButton({ jobId }:{ jobId: string }){
  const [loading,setLoading]=React.useState(false);
  async function pay(){ setLoading(true);
    try{ const r=await fetch('/api/stripe/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({jobId})}); const d=await r.json(); if(!r.ok) throw new Error(d.error||'failed'); window.location.href=d.url; }
    catch(err:any){ alert(err.message||'Failed to start checkout'); } finally { setLoading(false); }
  }
  return <button onClick={pay} disabled={loading} className="rounded-md bg-emerald-600 text-white px-3 py-1.5">{loading?'Redirecting…':'Pay securely'}</button>;
}
