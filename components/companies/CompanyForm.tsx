// components/companies/CompanyForm.tsx
// Reusable form for creating AND editing a client company.
// The page decides which action runs and which values to start with.
"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { CompanyFormState } from "@/actions/companies";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  // Any action with the (prevState, formData) shape: createCompany or a bound updateCompany
  action: (state: CompanyFormState, formData: FormData) => Promise<CompanyFormState>;
  // Starting values when editing (empty when creating)
  defaultValues?: { name: string; cui: string; address: string };
  submitLabel?: string;
  cancelHref: string;
};

export default function CompanyForm({
  action,
  defaultValues,
  submitLabel = "Salvează",
  cancelHref,
}: Props) {
  const [state, formAction, pending] = useActionState(action, {});

  // After an error: what the user typed. Otherwise: the saved values (edit) or empty (new).
  const values = state.values ?? defaultValues;

  return (
    <form action={formAction} className="space-y-5">
      {/* General error (e.g. database down) */}
      {state.message && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Denumire firmă *</Label>
        <Input
          id="name"
          name="name"
          placeholder="Brutăria Ana SRL"
          defaultValue={values?.name}
          aria-invalid={!!state.errors?.name}
        />
        {state.errors?.name && (
          <p className="text-sm text-destructive">{state.errors.name[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cui">CUI</Label>
        <Input
          id="cui"
          name="cui"
          placeholder="RO12345678"
          defaultValue={values?.cui}
          aria-invalid={!!state.errors?.cui}
        />
        {state.errors?.cui && (
          <p className="text-sm text-destructive">{state.errors.cui[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Adresă</Label>
        <Input
          id="address"
          name="address"
          placeholder="Str. Exemplu 10, Cluj-Napoca"
          defaultValue={values?.address}
          aria-invalid={!!state.errors?.address}
        />
        {state.errors?.address && (
          <p className="text-sm text-destructive">{state.errors.address[0]}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Se salvează…" : submitLabel}
        </Button>
        {/* The cancel "button" is really a link, styled like an outline button */}
        <Link href={cancelHref} className={buttonVariants({ variant: "outline" })}>
          Anulează
        </Link>
      </div>
    </form>
  );
}