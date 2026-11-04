// app/(dashboard)/layout.tsx
// Mobile: top bar above content (flex-col). Desktop: sidebar beside content (md:flex-row).

import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      <MobileNav />
      <Sidebar />
      {/* Less padding on phones, more on desktop */}
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}