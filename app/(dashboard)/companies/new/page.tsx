// app/(dashboard)/companies/new/page.tsx
import CompanyForm from "@/components/companies/CompanyForm";

export default function NewCompanyPage() {
  return (
    <div className="max-w-xl">
      <h1 className="mb-6 text-2xl font-semibold">Firmă nouă</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <CompanyForm />
      </div>
    </div>
  );
}