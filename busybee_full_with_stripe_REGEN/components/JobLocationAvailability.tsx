"use client";
import React from 'react'; import AvailableHelpersBadge from '@/components/AvailableHelpersBadge';
export default function JobLocationAvailability(){
  const [pos, setPos] = React.useState<{ lat:number; lng:number } | null>(null);
  React.useEffect(()=>{ if(navigator?.geolocation){ navigator.geolocation.getCurrentPosition((p)=> setPos({ lat:p.coords.latitude, lng:p.coords.longitude }), ()=>{}); } }, []);
  if(!pos) return (<div className="text-xs text-gray-500">Allow location to see helpers near you. Or enter your city/postcode below.</div>);
  return <AvailableHelpersBadge lat={pos.lat} lng={pos.lng} radiusKm={10} />;
}
