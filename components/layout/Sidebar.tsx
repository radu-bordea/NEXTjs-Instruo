// components/layout/Sidebar.tsx
// Desktop only: "hidden md:flex" → not shown on phones, shown from medium screens up.

import Link from "next/link";
import NavLinks from "@/components/layout/NavLinks";
import ThemeToggle from "@/components/theme/ThemeToggle";
// at the top, with the other imports
import { UserButton } from "@clerk/nextjs";
import UserMenu from "@/components/layout/UserMenu";
import { OrganizationSwitcher } from "@clerk/nextjs";

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
        {/* Shows the active consultancy. Lets the user switch, create one,
    or manage members. hidePersonal: personal accounts aren't allowed. */}
        <div className="mb-4">
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl="/dashboard"
            afterCreateOrganizationUrl="/dashboard"
          />
        </div>
        <NavLinks />
      </div>
      {/* Bottom: avatar + account menu (profile, sign out) and the theme toggle */}
      <div className="flex items-center justify-between gap-2 border-t border-sidebar-border pt-4">
        <UserMenu />
        <ThemeToggle />
      </div>
    </aside>
  );
}
