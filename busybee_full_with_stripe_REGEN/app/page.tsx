import React from 'react'; import AvailabilityHeatChips from '@/components/AvailabilityHeatChips'; import AvailableHelpersBadge from '@/components/AvailableHelpersBadge'; import PostcodeAvailability from '@/components/PostcodeAvailability';
function GeoBadge(){ return <div suppressHydrationWarning>{typeof window==='undefined'?null:<GeoBadgeInner/>}</div>; }
function GeoBadgeInner(){ const [pos,setPos]=React.useState<{lat:number;lng:number}|null>(null) as any; React.useEffect(()=>{ if(navigator?.geolocation){ navigator.geolocation.getCurrentPosition((p)=>setPos({lat:p.coords.latitude,lng:p.coords.longitude}),()=>{});} },[]); if(!pos) return <div className='text-xs text-gray-500'>Allow location to see helpers near you.</div>; return <AvailableHelpersBadge lat={pos.lat} lng={pos.lng} radiusKm={10}/>; }
export default function HomePage(){ return (<main><section className='bg-gradient-to-b from-emerald-50 to-white border-b'><div className='max-w-6xl mx-auto px-6 py-12 grid gap-6 md:grid-cols-2 items-center'><div>
  <h1 className='text-3xl md:text-4xl font-semibold leading-tight'>BusyBee helps you get small jobs done — fast, safe, affordable.</h1>
  <p className='mt-3 text-gray-600'>Post a task in minutes, chat securely, and pay with confidence. Helpers can go online and start earning today.</p>
  <div className='mt-4 flex items-center gap-3'><a href='/jobs/new' className='rounded-lg bg-emerald-600 text-white px-4 py-2'>Post a job</a><a href='/helper/dashboard' className='rounded-lg border px-4 py-2'>I want to help</a></div>
  <div className='mt-4'><AvailabilityHeatChips lat={53.3498} lng={-6.2603} radiusKm={10}/></div>
  <div className='mt-2'><GeoBadge/></div>
  <div className='mt-4'><PostcodeAvailability/></div>
</div><div className='rounded-2xl border bg-white p-6'><div className='text-sm text-gray-700'><div className='font-medium'>Why BusyBee?</div><ul className='list-disc pl-5 mt-2 space-y-1'>
  <li>Secure payments held in escrow; auto-release after 3 days.</li>
  <li>Next-of-kin notifications for peace of mind.</li>
  <li>Privacy-first: addresses shared only when a match is confirmed.</li>
  <li>Helpers control availability with a simple online/busy toggle.</li>
</ul></div></div></div></section></main>); }
