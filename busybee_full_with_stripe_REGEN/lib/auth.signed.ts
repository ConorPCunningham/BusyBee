import { cookies } from 'next/headers';
export async function requireUser(){ const c=cookies(); const user=c.get('demo_user'); if(!user) throw new Error('unauthorized'); return { id: user.value, role: c.get('demo_role')?.value || 'REQUESTER' } as const; }
