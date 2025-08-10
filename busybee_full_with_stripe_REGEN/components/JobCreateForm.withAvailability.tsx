"use client";
import React from 'react'; import JobFormNokHint from '@/components/JobFormNokHint'; import JobLocationAvailability from '@/components/JobLocationAvailability'; import AvailabilityHeatChips from '@/components/AvailabilityHeatChips';
export default function JobCreateForm(){
  return (<form className="space-y-4">
    <div><label className="block text-sm">Title<input className="mt-1 w-full rounded-md border px-3 py-2" placeholder="e.g., Light gardening help" /></label></div>
    <div><label className="block text-sm">Description<textarea className="mt-1 w-full rounded-md border px-3 py-2" rows={4} /></label></div>
    <div><div className="text-sm font-medium mb-1">Helpers near you</div><JobLocationAvailability /><div className="mt-2"><AvailabilityHeatChips lat={53.3498} lng={-6.2603} radiusKm={10} /></div></div>
    <JobFormNokHint />
    <div className="pt-2"><button className="rounded-lg bg-emerald-600 text-white px-3 py-1.5">Create job</button></div>
  </form>);
}
