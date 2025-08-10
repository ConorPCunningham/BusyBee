export function coarseCell(lat: number, lng: number){
  const clat = Math.round(lat * 5) / 5;
  const clng = Math.round(lng * 5) / 5;
  return `${clat.toFixed(1)}:${clng.toFixed(1)}`;
}
export function withinRadius(lat1:number, lng1:number, lat2:number, lng2:number, km:number){
  const R = 6371;
  const dLat = (lat2-lat1) * Math.PI/180;
  const dLng = (lng2-lng1) * Math.PI/180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  const c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R*c <= km;
}
