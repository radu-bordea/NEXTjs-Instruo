// app/(dashboard)/companies/[id]/employees/[employeeId]/edit/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { updateEmployee } from "@/actions/employees";
import EmployeeForm from "@/components/employees/EmployeeForm";
import { toInputDate } from "@/lib/dates";

export const instant = false;

export default async function EditEmployeePage({
  params,
}: {
  params: Promise<{ id: string; employeeId: string }>;
}) {
  const { id, employeeId } = await params;
  const { orgId } = await requireOrg();

  // Employee must be in this company AND this org
  const employee = await db.employee.findFirst({
    where: { id: employeeId, companyId: id, orgId },
    include: { company: { select: { name: true } } },
  });
  if (!employee) notFound();

  return (
    <div className="max-w-2xl">
      <p className="text-sm text-muted-foreground">{employee.company.name}</p>
      <h1 className="mb-6 text-2xl font-semibold">Editează angajatul</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <EmployeeForm
          action={updateEmployee.bind(null, id, employee.id)}
          defaultValues={{
            firstName: employee.firstName,
            lastName: employee.lastName,
            jobTitle: employee.jobTitle,
            hireDate: toInputDate(employee.hireDate),
            medicalFitUntil: toInputDate(employee.medicalFitUntil),
          }}
          submitLabel="Salvează modificările"
          cancelHref={`/companies/${id}`}
        />
      </div>
    </div>
  );
}