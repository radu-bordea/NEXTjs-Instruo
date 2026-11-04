// app/(dashboard)/companies/page.tsx
export default function CompaniesPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Firme client</h1>
      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Nu ai adăugat încă nicio firmă.</p>
      </div>
    </div>
  );
}