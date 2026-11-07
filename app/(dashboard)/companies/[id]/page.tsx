// app/(dashboard)/companies/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil } from "lucide-react";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import DeleteCompanyButton from "@/components/companies/DeleteCompanyButton";

export const instant = false;

// Next.js 16: params is a Promise, so we await it
export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { orgId } = await requireOrg();

  // findFirst with id AND orgId: another org's company → null → 404
  const company = await db.clientCompany.findFirst({ where: { id, orgId } });
  if (!company) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/companies" className="text-sm text-muted-foreground hover:text-foreground">
            ← Firme client
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{company.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/companies/${company.id}/edit`} className={buttonVariants({ variant: "outline" })}>
            <Pencil className="size-4" />
            Editează
          </Link>
          <DeleteCompanyButton id={company.id} name={company.name} />
        </div>
      </div>

      <dl className="grid gap-4 rounded-lg border border-border bg-card p-6 shadow-sm sm:grid-cols-2">
        <div>
          <dt className="text-sm text-muted-foreground">CUI</dt>
          <dd className="font-medium">{company.cui ?? "—"}</dd>
        </div>
        <div>
          <dt className="text-sm text-muted-foreground">Adresă</dt>
          <dd className="font-medium">{company.address ?? "—"}</dd>
        </div>
      </dl>

      {/* Day 8: employees list goes here */}
      <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
        Angajații firmei vor apărea aici.
      </div>
    </div>
  );
}