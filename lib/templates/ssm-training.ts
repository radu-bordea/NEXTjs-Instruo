// lib/templates/ssm-training.ts
// The standard individual SSM training sheet (based on Anexa 11, HG 1425/2006).
// Built once, used by every organization. The seed script saves it in the database.

import type { FormTemplateDefinition } from "./types";

export const ssmTrainingTemplate: FormTemplateDefinition = {
  slug: "ssm-training",
  name: "Fișă de instruire individuală SSM",
  version: 1,
  fields: [
    {
      key: "trainingType",
      label: "Tip instruire",
      type: "select",
      required: true,
      options: [
        { value: "INTRODUCTORY", label: "Introductiv-generală" },
        { value: "ON_THE_JOB", label: "La locul de muncă" },
        { value: "PERIODIC", label: "Periodică" },
      ],
    },
    {
      // Saved in the FormEntry "date" COLUMN (not in the JSON),
      // because the dashboard and sorting need it.
      key: "date",
      label: "Data instruirii",
      type: "date",
      required: true,
    },
    {
      key: "durationHours",
      label: "Durata (ore)",
      type: "number",
      required: true,
      min: 0.5,
      max: 40,
    },
    {
      key: "material",
      label: "Materialul prezentat",
      type: "textarea",
      required: true,
      placeholder: "Legea 319/2006, riscurile postului, primul ajutor...",
      max: 2000,
    },
    {
      key: "result",
      label: "Rezultatul verificării",
      type: "select",
      required: true,
      options: [
        { value: "PASSED", label: "Admis" },
        { value: "FAILED", label: "Respins" },
      ],
    },
    {
      key: "trainerName",
      label: "Instruirea efectuată de",
      type: "text",
      required: true,
      placeholder: "Nume și prenume",
      max: 120,
    },
    {
      key: "verifierName",
      label: "Instruirea verificată de",
      type: "text",
      required: false,
      placeholder: "Nume și prenume",
      max: 120,
    },
  ],
};

// How often periodic training must be repeated, in months.
// General rule: at most every 6 months (12 for administrative staff).
// TODO: confirm with the SSM consultant, and later let each job type choose.
export const DEFAULT_TRAINING_INTERVAL_MONTHS = 6;

// When is the next training due?
// Every training (introductory, on-the-job or periodic) is followed by periodic ones,
// so the next one is always "training date + interval".
export function calculateNextDueDate(
  trainingDate: Date,
  intervalMonths = DEFAULT_TRAINING_INTERVAL_MONTHS
): Date {
  const next = new Date(trainingDate);           // copy, so we don't change the original
  next.setUTCMonth(next.getUTCMonth() + intervalMonths);
  return next;
}