export interface Product {
  clave: string;
  descripcion: string | null;
  existencia: number | null;
  precio: number | null;
  actualizado_en: string | null;
  lin_prod: string | null;
}

export const MARGEN_BASE = 1.30;   // 30% para el resto
export const MARGEN_ESPECIAL = 1.52; // 52% para marcas especiales
export const IVA = 1.16;

const MARCAS_ESPECIALES = ["TRUPE", "VOLTE"];

function esMarcaEspecial(p: Product): boolean {
  const marca = (p.lin_prod ?? "").trim().toUpperCase();
  return MARCAS_ESPECIALES.includes(marca);
}

export function precioNeto(p: Product): number {
  const margen = esMarcaEspecial(p) ? MARGEN_ESPECIAL : MARGEN_BASE;
  return (p.precio ?? 0) * margen * IVA;
}