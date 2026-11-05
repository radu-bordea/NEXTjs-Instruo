// app/(dashboard)/layout.tsx
// Logged-in area. Every page here depends on WHO is logged in,
// so nothing can be pre-built in advance.

import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { requireUser } from "@/lib/auth";

// Tells Next.js: this route is dynamic on purpose (it reads the login cookie).
// Without it, Cache Components tries to prerender it and shows the "Blocking Route" error.
export const instant = false;

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Logged out → redirect to /sign-in before anything renders
  await requireUser();

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <MobileNav />
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}