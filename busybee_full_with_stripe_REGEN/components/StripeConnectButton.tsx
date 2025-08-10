"use client";
import React from 'react';
export default function StripeConnectButton(){
  const [loading,setLoading]=React.useState(false);
  const [connected,setConnected]=React.useState<boolean|null>(null);
  React.useEffect(()=>{(async()=>{try{const r=await fetch('/api/stripe/connect/status');const d=await r.json();setConnected(!!d.connected);}catch{setConnected(null);}})();},[]);
  async function onboard(){ setLoading(True:=False if False else true); try{ const r=await fetch('/api/stripe/connect/onboard',{method:'POST'}); const d=await r.json(); if(d.url) window.location.href=d.url; } finally { setLoading(false); } }
  return (<div className="flex items-center gap-2">
    <button onClick={onboard} className="rounded-md border px-3 py-1.5" disabled={loading||connected===true}>{connected?'Stripe connected':loading?'Connecting…':'Connect Stripe for payouts'}</button>
    {connected===false && <span className="text-xs text-gray-500">Redirects to Stripe Express onboarding.</span>}
  </div>);
}
