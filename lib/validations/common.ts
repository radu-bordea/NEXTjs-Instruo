// lib/validations/common.ts
// Small Zod building blocks reused by several schemas.

import { z } from "zod";

// Optional text: trim, max length, "" → null
export const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).transform((value) => value || null);

// <input type="date"> sends "YYYY-MM-DD" (or "" when empty)
const isoDate = /^\d{4}-\d{2}-\d{2}$/;

// Required date: must be filled in, becomes a real Date
export const requiredDate = (message: string) =>
  z.string().regex(isoDate, message).transform((value) => new Date(value));

// Optional date: "" → null, otherwise a real Date
export const optionalDate = (message: string) =>
  z
    .string()
    .refine((value) => value === "" || isoDate.test(value), message)
    .transform((value) => (value ? new Date(value) : null));