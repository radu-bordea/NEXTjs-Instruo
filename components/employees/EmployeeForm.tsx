// components/employees/EmployeeForm.tsx
// Reusable form for creating and editing an employee.
"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { EmployeeFormState } from "@/actions/employees";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Values = NonNullable<EmployeeFormState["values"]>;

type Props = {
  action: (state: EmployeeFormState, formData: FormData) => Promise<EmployeeFormState>;
  defaultValues?: Values;
  submitLabel?: string;
  cancelHref: string;
};

// One field config per input, so the JSX stays short
const fields: { name: keyof Values; label: string; type: string; placeholder?: string }[] = [
  { name: "lastName", label: "Nume *", type: "text", placeholder: "Popescu" },
  { name: "firstName", label: "Prenume *", type: "text", placeholder: "Maria" },
  { name: "jobTitle", label: "Funcție *", type: "text", placeholder: "Vânzător" },
  { name: "hireDate", label: "Data angajării *", type: "date" },
  { name: "medicalFitUntil", label: "Aviz medical valabil până la", type: "date" },
];

export default function EmployeeForm({ action, defaultValues, submitLabel = "Salvează", cancelHref }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const values = state.values ?? defaultValues;

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p>
      )}

      {/* sm:grid-cols-2 → two columns on wider screens */}
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              defaultValue={values?.[field.name]}
              aria-invalid={!!state.errors?.[field.name]}
            />
            {state.errors?.[field.name] && (
              <p className="text-sm text-destructive">{state.errors[field.name]![0]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Se salvează…" : submitLabel}
        </Button>
        <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
          Anulează
        </Link>
      </div>
    </form>
  );
}