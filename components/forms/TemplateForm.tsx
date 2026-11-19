// components/forms/TemplateForm.tsx
// Draws a form from a template's fields: the right input for each field type.
"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { TemplateField } from "@/lib/templates/types";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type TemplateFormState = {
  errors?: Record<string, string[] | undefined>;
  message?: string;
  success?: string;                // temporary: shown while saving isn't built yet
  values?: Record<string, string>;
};

type Props = {
  fields: TemplateField[];
  action: (state: TemplateFormState, formData: FormData) => Promise<TemplateFormState>;
  defaultValues?: Record<string, string>;
  submitLabel?: string;
  cancelHref: string;
};

// Native <select> styled like shadcn's Input (simple, and works with FormData)
const selectClass =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive dark:bg-input/30";

export default function TemplateForm({ fields, action, defaultValues, submitLabel = "Salvează", cancelHref }: Props) {
  const [state, formAction, pending] = useActionState(action, {});
  const values = state.values ?? defaultValues;

  // Draw one input depending on the field type
  function renderInput(field: TemplateField) {
    const common = {
      id: field.key,
      name: field.key,
      defaultValue: values?.[field.key] ?? "",
      "aria-invalid": !!state.errors?.[field.key],
    };

    switch (field.type) {
      case "textarea":
        return <Textarea {...common} placeholder={field.placeholder} rows={4} />;
      case "select":
        return (
          <select {...common} className={selectClass}>
            <option value="">Alege…</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        );
      case "number":
        return <Input {...common} type="number" step="0.5" min={field.min} max={field.max} />;
      case "date":
        return <Input {...common} type="date" />;
      default:
        return <Input {...common} type="text" placeholder={field.placeholder} />;
    }
  }

  return (
    <form action={formAction} className="space-y-5">
      {state.message && (
        <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{state.message}</p>
      )}
      {state.success && (
        <p className="rounded-md bg-primary/10 p-3 text-sm text-primary">{state.success}</p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((field) => (
          // Text areas take the full width; other fields share two columns
          <div key={field.key} className={`space-y-2 ${field.type === "textarea" ? "sm:col-span-2" : ""}`}>
            <Label htmlFor={field.key}>
              {field.label}
              {field.required && " *"}
            </Label>
            {renderInput(field)}
            {state.errors?.[field.key] && (
              <p className="text-sm text-destructive">{state.errors[field.key]![0]}</p>
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