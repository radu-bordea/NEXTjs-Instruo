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
        // overflow-hidden: row backgrounds stay inside the rounded corners
        <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-sm">
          {companies.map((company) => (
            // li: only the zebra stripe (every 2nd row lightly shaded)
            <li key={company.id} className="even:bg-muted/40">
              {/* The whole row is a link to the company's detail page.
                  flex + w-full: fills the row, so you can click anywhere on it.
                  hover:bg-accent: light teal on hover shows it's clickable. */}
              <Link
                href={`/companies/${company.id}`}
                className="flex w-full items-center justify-between gap-4 p-4 transition-colors hover:bg-accent"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{company.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {[company.cui, company.address]
                      .filter(Boolean)
                      .join(" · ") || "Fără detalii"}
                  </p>
                </div>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {company.createdAt.toLocaleDateString("ro-RO")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
