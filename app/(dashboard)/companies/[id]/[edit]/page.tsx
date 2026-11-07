// app/(dashboard)/companies/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { requireOrg } from "@/lib/auth";
import { updateCompany } from "@/actions/companies";
import CompanyForm from "@/components/companies/CompanyForm";

export const instant = false;

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { orgId } = await requireOrg();

  const company = await db.clientCompany.findFirst({ where: { id, orgId } });
  if (!company) notFound();

  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Editează firma</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <CompanyForm
          action={updateCompany.bind(null, company.id)}
          defaultValues={{ name: company.name, cui: company.cui ?? "", address: company.address ?? "" }}
          submitLabel="Salvează modificările"
          cancelHref={`/companies/${company.id}`}
        />
      </div>
    </div>
  );
}