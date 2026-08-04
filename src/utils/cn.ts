import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
// utils/normalize.ts  ← crea este archivo utilitario
export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")                        // descompone caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "")         // elimina diacríticos (á→a, é→e, etc.)
    .replace(/[^a-z0-9\s]/g, " ")           // reemplaza símbolos por espacio
    .replace(/\s+/g, " ")                    // colapsa espacios múltiples
    .trim();
}