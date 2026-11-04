// app/(dashboard)/dashboard/page.tsx
function StatCard({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-semibold ${tone}`}>{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Panou</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* red = expired: uses the theme's destructive color */}
        <StatCard label="Instruiri expirate" value={0} tone="text-destructive" />
        {/* amber = due soon: no theme token for this, so a fixed color with a dark-mode version */}
        <StatCard label="Expiră în 30 de zile" value={0} tone="text-amber-600 dark:text-amber-400" />
        <StatCard label="Angajați" value={0} tone="text-foreground" />
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-6 shadow-sm">
        <h2 className="mb-2 font-medium">De făcut în curând</h2>
        <p className="text-sm text-muted-foreground">
          Aici vor apărea instruirile expirate sau care expiră curând.
        </p>
      </div>
    </div>
  );
}