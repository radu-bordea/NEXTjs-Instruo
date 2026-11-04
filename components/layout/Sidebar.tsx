// components/layout/Sidebar.tsx
// Desktop only: "hidden md:flex" → not shown on phones, shown from medium screens up.

import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground md:flex">
      <div>
        <Link href="/dashboard" className="mb-6 block text-lg font-semibold text-primary">
          Instruo
        </Link>
        <NavLinks />
      </div>

      {/* Bottom: the "you" area. Tomorrow Clerk's <UserButton /> goes on the left. */}
      <div className="flex items-center justify-between border-t border-sidebar-border pt-4">
        <span className="text-xs text-muted-foreground">Cont</span>
        <ThemeToggle />
      </div>
    </aside>
  );
}