import { PrismaClient } from '@prisma/client';
let prisma: PrismaClient | null = null;
export async function getClient(){ if(!prisma){ prisma=new PrismaClient(); } return prisma; }
