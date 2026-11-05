// lib/db.ts
// One Prisma client for the whole app, connected through Neon's adapter.

import "server-only";
import { PrismaClient } from "@/lib/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

function createClient() {
  const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!, // pooled connection
  });
  return new PrismaClient({ adapter });
}

// In development, Next.js reloads files on every save. Without this,
// each reload would create a NEW client, and you'd run out of connections.
// We keep one client on globalThis, which survives reloads.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;