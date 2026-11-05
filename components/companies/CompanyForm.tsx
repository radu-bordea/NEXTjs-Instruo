// components/companies/CompanyForm.tsx
// Client component: needs useActionState to show errors and a "saving..." state.
"use client";

import { useActionState } from "react";
import Link from "next/link";
import { createCompany, type CompanyFormState } from "@/actions/companies";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: CompanyFormState = {};

export default function CompanyForm() {
  // state = what the action returned last time (errors or nothing)
  // formAction = pass to <form action>; pending = true while saving
  const [state, formAction, pending] = useActionState(
    createCompany,
    initialState,
  );

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
          defaultValue={state.values?.name}
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
          defaultValue={state.values?.cui}
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
          defaultValue={state.values?.address}
          aria-invalid={!!state.errors?.address}
        />
        {state.errors?.address && (
          <p className="text-sm text-destructive">{state.errors.address[0]}</p>
        )}
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? "Se salvează…" : "Salvează"}
        </Button>
        {/* The cancel "button" is really a link, styled like an outline button */}
        <Link
          href="/companies"
          className={buttonVariants({ variant: "outline" })}
        >
          Anulează
        </Link>
      </div>
    </form>
  );
}
