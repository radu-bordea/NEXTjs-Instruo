// app/(dashboard)/companies/[id]/employees/[employeeId]/trainings/new/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { getBuiltInTemplate } from "@/lib/templates/load";
import { createTraining } from "@/actions/trainings";
import TemplateForm from "@/components/forms/TemplateForm";
import { toInputDate } from "@/lib/dates";

export const instant = false;

export default async function NewTrainingPage({
  params,
}: {
  params: Promise<{ id: string; employeeId: string }>;
}) {
  const { id, employeeId } = await params;
  const { orgId } = await requireOrg();

  const employee = await db.employee.findFirst({
    where: { id: employeeId, companyId: id, orgId },
    include: { company: { select: { name: true } } },
  });
  if (!employee) notFound();

  const template = await getBuiltInTemplate("ssm-training");
  if (!template) notFound();

  return (
    <div className="max-w-3xl">
      <p className="text-sm text-muted-foreground">
        {employee.company.name} · {employee.lastName} {employee.firstName}
      </p>
      <h1 className="mb-6 text-2xl font-semibold">{template.name}</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <TemplateForm
          fields={template.fields}
          action={createTraining.bind(null, id, employee.id)}
          defaultValues={{ date: toInputDate(new Date()) }} // today, as a sensible default
          cancelHref={`/companies/${id}`}
        />
      </div>
    </div>
  );
}