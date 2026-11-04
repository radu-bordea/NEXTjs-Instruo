// components/layout/MobileNav.tsx
// Mobile only ("md:hidden"): top bar with logo, theme toggle and a menu button.
// The menu button opens a Sheet (drawer) from the left with the same NavLinks.
"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function MobileNav() {
  // We control open/closed ourselves, so a link click can close the drawer
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between border-b border-sidebar-border bg-sidebar px-4 py-3 md:hidden">
      <Link href="/dashboard" className="text-lg font-semibold text-primary">
        Instruo
      </Link>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Deschide meniul"
          className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        >
          <Menu className="size-5" />
        </button>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-sidebar p-4">
          {/* A title is required for accessibility (screen readers announce it) */}
          <SheetHeader className="p-0 pb-4">
            <SheetTitle className="text-left text-primary">Instruo</SheetTitle>
          </SheetHeader>
          <NavLinks onNavigate={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </header>
  );
}