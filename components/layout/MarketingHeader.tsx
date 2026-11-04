// components/layout/MarketingHeader.tsx
// Top bar for public pages: logo left, theme toggle + login button right.

import Link from "next/link";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function MarketingHeader() {
  return (
    // bg-background/80 + backdrop-blur: slightly see-through header over the grid
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-primary">
          Instruo
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* Later this goes to /sign-in (Clerk). For now straight to the dashboard. */}
          <Link
            href="/dashboard"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Intră în cont
          </Link>
        </div>
      </div>
    </header>
  );
}
