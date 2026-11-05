// app/(dashboard)/companies/page.tsx
// Server component: reads the companies directly from the database.

import Link from "next/link";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";

// Dynamic on purpose: shows this organization's live data.
export const instant = false;

export default async function CompaniesPage() {
  // Every data page checks the org itself (layouts don't always re-run)
  const { orgId } = await requireOrg();

  // ONLY this consultancy's companies, newest first
  const companies = await db.clientCompany.findMany({
    where: { orgId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold">Firme client</h1>
        {/* A link styled as a button (navigation, not an action) */}
        <Link href="/companies/new" className={buttonVariants()}>
          <Plus className="size-4" />
          Adaugă firmă
        </Link>
      </div>

      {companies.length === 0 ? (
        // Empty state: invite to the first action
        <div className="rounded-lg border border-border bg-card p-10 text-center shadow-sm">
          <p className="font-medium">Adaugă prima firmă client</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Firmele pentru care ții evidența instruirilor SSM apar aici.
          </p>
        </div>
      ) : (
        // List: bordered rows, one per company
        <ul className="divide-y divide-border rounded-lg border border-border bg-card shadow-sm">
          {companies.map((company) => (
            <li key={company.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate font-medium">{company.name}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {[company.cui, company.address].filter(Boolean).join(" · ") || "Fără detalii"}
                </p>
              </div>
              <span className="shrink-0 text-xs text-muted-foreground">
                {company.createdAt.toLocaleDateString("ro-RO")}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}