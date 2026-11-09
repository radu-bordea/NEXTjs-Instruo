// app/(dashboard)/companies/[id]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pencil, Plus } from "lucide-react";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import DeleteCompanyButton from "@/components/companies/DeleteCompanyButton";
import ConfirmDeleteButton from "@/components/ConfirmDeleteButton";
import { deleteEmployee } from "@/actions/employees";
import { formatDate, getExpiryStatus, type ExpiryStatus } from "@/lib/dates";

export const instant = false;

// Text + colors for the medical badge
const medicalBadge: Record<ExpiryStatus, { text: string; className: string }> =
  {
    none: { text: "Fără aviz", className: "bg-muted text-muted-foreground" },
    expired: {
      text: "Expirat",
      className: "bg-destructive/10 text-destructive",
    },
    soon: {
      text: "Expiră curând",
      className: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    },
    ok: { text: "Valabil", className: "bg-primary/10 text-primary" },
  };

// Next.js 16: params is a Promise, so we await it
export default async function CompanyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { orgId } = await requireOrg();

  // findFirst with id AND orgId: another org's company → null → 404
  const company = await db.clientCompany.findFirst({
    where: { id, orgId },
    include: {
      employees: { orderBy: [{ lastName: "asc" }, { firstName: "asc" }] },
    },
  });

  // Not found or another org's company → 404.
  // After this line TypeScript knows company is NOT null.
  if (!company) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link
            href="/companies"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Firme client
          </Link>
          <h1 className="mt-1 text-2xl font-semibold">{company.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link
            href={`/companies/${company.id}/edit`}
            className={buttonVariants({ variant: "outline" })}
          >
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
        {/* Employees */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">
              Angajați ({company.employees.length})
            </h2>
            <Link
              href={`/companies/${company.id}/employees/new`}
              className={buttonVariants({ size: "sm" })}
            >
              <Plus className="size-4" />
              Adaugă angajat
            </Link>
          </div>

          {company.employees.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              Adaugă primul angajat al acestei firme.
            </div>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-lg border border-border bg-card shadow-sm">
              {company.employees.map((employee) => {
                const badge =
                  medicalBadge[getExpiryStatus(employee.medicalFitUntil)];
                return (
                  <li
                    key={employee.id}
                    className="flex items-center justify-between gap-4 p-4 even:bg-muted/40"
                  >
                    <Link
                      href={`/companies/${company.id}/employees/${employee.id}/edit`}
                      className="min-w-0 flex-1 hover:underline"
                    >
                      <p className="truncate font-medium">
                        {employee.lastName} {employee.firstName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {employee.jobTitle} · angajat{" "}
                        {formatDate(employee.hireDate)}
                      </p>
                    </Link>
                    <div className="flex shrink-0 items-center gap-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs font-medium ${badge.className}`}
                      >
                        {badge.text}
                        {employee.medicalFitUntil &&
                          ` · ${formatDate(employee.medicalFitUntil)}`}
                      </span>
                      <ConfirmDeleteButton
                        action={deleteEmployee.bind(
                          null,
                          company.id,
                          employee.id,
                        )}
                        title={`Ștergi angajatul ${employee.lastName} ${employee.firstName}?`}
                        description="Se vor șterge și fișele lui de instruire. Acțiunea nu poate fi anulată."
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
