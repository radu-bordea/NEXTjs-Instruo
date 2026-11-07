// lib/prisma-errors.ts
// True if Prisma refused a save because of a @@unique rule (error code P2002).
export function isUniqueError(error: unknown): boolean {
  return (
    typeof error === "object" && error !== null &&
    "code" in error && error.code === "P2002"
  );
}