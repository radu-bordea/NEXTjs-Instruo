// lib/auth.ts
// One place for "who is logged in, and for which consultancy?".
// Every protected page, layout and server action calls requireOrg().

import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function requireOrg() {
  // Not logged in (or still choosing an organization) → sent to /sign-in
  const { userId, orgId } = await auth.protect();

  // Should never happen with personal accounts off, but we never want
  // a database query without an orgId, so we check anyway.
  if (!orgId) redirect("/sign-in");

  return { userId, orgId };
}