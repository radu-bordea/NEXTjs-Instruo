// lib/auth.ts
// One place for "who is logged in?". Every protected page, layout and
// server action calls this. Tomorrow it also returns the organization (orgId).

import "server-only"; // safety: this file can never be imported into browser code
import { auth } from "@clerk/nextjs/server";

export async function requireUser() {
  // Not logged in → page requests are redirected to /sign-in,
  // server actions get a 401 error.
  const { userId } = await auth.protect();
  return { userId };
}