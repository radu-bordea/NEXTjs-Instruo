// app/(marketing)/layout.tsx
// Layout for public pages: header on top, plain background.
// The grid is added per section (e.g. the hero) with bg-grid-fade.

import MarketingHeader from "@/components/layout/MarketingHeader";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <MarketingHeader />
      <main>{children}</main>
    </div>
  );
}