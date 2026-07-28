/** Coincide exactamente con la tabla `productos` en Supabase */
export interface Product {
  clave: string;
  descripcion: string | null;
  existencia: number | null;
  precio: number | null;
  actualizado_en: string | null;
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
  return precio * IVA;
}