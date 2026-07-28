import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Cálculo del precio neto:
 *   precio base  ×1.30  (margen del 30%)
 *              ×1.16  (IVA del 16%)
 * Ejemplo: $100 → $130 → $150.80
 */
export const MARGEN = 1.3;
export const IVA = 1.16;

export function precioNeto(precio: number): number {
  return precio * MARGEN * IVA;
}
