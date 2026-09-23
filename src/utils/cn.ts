import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Acepta string, número, null o undefined sin tronar
export function normalize(value: unknown): string {
  return (value == null ? "" : String(value))
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")   // quita acentos
    .replace(/[^a-z0-9\s]/g, " ")      // símbolos → espacio
    .replace(/\s+/g, " ")
    .trim();
}

// Solo letras y números: "CDM-10N" / "cdm 10n" → "cdm10n"
export function compact(value: unknown): string {
  return normalize(value).replace(/\s/g, "");
}