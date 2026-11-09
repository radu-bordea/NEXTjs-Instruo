// app/(dashboard)/companies/[id]/employees/new/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { createEmployee } from "@/actions/employees";
import EmployeeForm from "@/components/employees/EmployeeForm";

export const instant = false;

export default async function NewEmployeePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { orgId } = await requireOrg();

  const company = await db.clientCompany.findFirst({ where: { id, orgId }, select: { id: true, name: true } });
  if (!company) notFound();

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-muted-foreground">{company.name}</p>
      <h1 className="mb-6 text-2xl font-semibold">Angajat nou</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <EmployeeForm action={createEmployee.bind(null, company.id)} cancelHref={`/companies/${company.id}`} />
      </div>
    </div>
  );
}