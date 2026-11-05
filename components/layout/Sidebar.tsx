// components/layout/Sidebar.tsx
// Desktop only: "hidden md:flex" → not shown on phones, shown from medium screens up.

import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";
// at the top, with the other imports
import { UserButton } from "@clerk/nextjs";

export default function Sidebar() {
  return (
    <aside className="hidden w-56 shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar p-4 text-sidebar-foreground md:flex">
      <div>
        <Link
          href="/dashboard"
          className="mb-6 block text-lg font-semibold text-primary"
        >
          Instruo
        </Link>
        <NavLinks />
      </div>

      {/* Bottom: avatar + account menu (profile, sign out) and the theme toggle */}
      <div className="flex items-center justify-between border-t border-sidebar-border pt-4">
        <UserButton />
        <ThemeToggle />
      </div>
    </aside>
  );
}
