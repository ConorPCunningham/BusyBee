import './globals.css'; import React from 'react';
export const metadata = { title: 'BusyBee', description: 'Get small jobs done — safe & affordable.' };
export default function RootLayout({ children }: { children: React.ReactNode }){
  return (<html lang="en"><body>
    <header className="border-b bg-white"><div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
      <a href="/" className="font-semibold">🐝 BusyBee</a>
      <nav className="ml-auto flex items-center gap-3 text-sm">
        <a href="/jobs/new" className="underline">Post a job</a>
        <a href="/helper/dashboard" className="underline">Helper dashboard</a>
        <a href="/auth/demo" className="underline">Demo login</a>
      </nav></div></header>
    {children}
  </body></html>);
}
