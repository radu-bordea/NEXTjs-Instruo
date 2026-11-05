// app/(auth)/layout.tsx
// Login pages: notebook grid, logo on top, Clerk's box centered.

import { Suspense } from "react";
import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-grid flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <Link href="/" className="text-2xl font-semibold text-primary">
        Instruo
      </Link>
      {/* Suspense: Clerk's box reads the URL in the browser.
          Next.js renders everything else first and fills this in after. */}
      <Suspense>{children}</Suspense>
    </div>
  );
}