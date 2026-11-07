// lib/auth.ts
// One place for "who is logged in, and for which consultancy?".
// Every protected page, layout and server action calls requireOrg().

import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { connection } from "next/server";

export async function requireOrg() {
  // connection(): tells Next.js "this needs a real request".
  // Everything after it (auth, database queries) is never run during prerendering.
  await connection();

  // Not logged in (or still choosing an organization) → sent to /sign-in
  const { userId, orgId } = await auth.protect();

  // We never want a database query without an orgId
  if (!orgId) redirect("/sign-in");

  return { userId, orgId };
}