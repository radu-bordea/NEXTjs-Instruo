// components/layout/NavLinks.tsx
// The menu, defined once and used in two places: desktop sidebar and mobile drawer.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, LayoutDashboard, Settings } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Panou", icon: LayoutDashboard },
  { href: "/companies", label: "Firme client", icon: Building2 },
  { href: "/settings", label: "Setări", icon: Settings },
];

// onNavigate is optional: the mobile drawer passes a function to close itself after a click
export default function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
              active
                ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            }`}
          >
            <Icon className="size-4" />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}