// lib/templates/types.ts
// The "language" we use to describe any form as data.
// The SSM training sheet, PSI sheet, and future custom forms all follow these types.

// Which kind of input to draw for a field
export type FieldType = "text" | "textarea" | "number" | "date" | "select";

// One choice in a dropdown.
// value = stored in the database (language-neutral, like "PERIODIC")
// label = shown to the user (Romanian, like "Periodic")
export type SelectOption = {
  value: string;
  label: string;
};

// One field of a form
export type TemplateField = {
  key: string;              // name in the saved data, e.g. "trainingType"
  label: string;            // shown above the input, e.g. "Tip instruire"
  type: FieldType;
  required: boolean;
  placeholder?: string;
  options?: SelectOption[]; // only for "select"
  min?: number;             // for "number": smallest allowed value
  max?: number;             // for "number": largest allowed value; for text: max length
};

// A whole form template
export type FormTemplateDefinition = {
  slug: string;    // stable id used in code, e.g. "ssm-training"
  name: string;    // shown in the app
  version: number; // increase when the fields change
  fields: TemplateField[];
};