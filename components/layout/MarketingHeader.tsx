// components/layout/MarketingHeader.tsx
// Logged out → "Intră în cont" (to sign-in). Logged in → "Mergi la panou" (to dashboard).

// at the top
import { Suspense } from "react";
import Link from "next/link";
import { Show } from "@clerk/nextjs";
import ThemeToggle from "@/components/theme/ThemeToggle";

const buttonClass =
  "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90";

export default function MarketingHeader() {
  return (
    <header className="border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-primary">
          Instruo
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {/* Suspense: <Show> reads the login cookie. The fallback (an empty box
    the size of the button) shows for a split second until it knows. */}
          <Suspense fallback={<div className="h-9 w-28" />}>
            <Show when="signed-out">
              <Link href="/sign-in" className={buttonClass}>
                Intră în cont
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard" className={buttonClass}>
                Mergi la panou
              </Link>
            </Show>
          </Suspense>
        </div>
      </div>
    </header>
  );
}
