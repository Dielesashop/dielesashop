import { supabase } from "./client";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 1000;

// URL base del bucket público "productos"
const BUCKET_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/productos`;

// Forma de cada fila que regresa Supabase (producto + sus fotos)
type Fila = Omit<Product, "imagenes"> & {
  producto_imagenes: { ruta: string; orden: number }[] | null;
};

/**
 * Trae TODO el catálogo desde la tabla `productos` en Supabase,
 * pidiendo de 1000 en 1000 (el límite por defecto de la API),
 * junto con las fotos de cada producto (tabla `producto_imagenes`).
 * Si algo falla devuelve un arreglo vacío.
 */
export async function getProducts(): Promise<Product[]> {
  const all: Product[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("productos")
      .select(
        "clave, descripcion, existencia, precio, actualizado_en, lin_prod, producto_imagenes(ruta, orden)"
      )
      .order("clave", { ascending: true })
      .order("orden", { referencedTable: "producto_imagenes", ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.warn("[Supabase] Error:", error.message);
      return [];
    }

    if (!data || data.length === 0) break;

    for (const { producto_imagenes, ...resto } of data as unknown as Fila[]) {
      const imagenes = (producto_imagenes ?? [])
        .sort((a, b) => a.orden - b.orden)
        .map((img) => `${BUCKET_URL}/${img.ruta}`);

      all.push({ ...resto, imagenes } as Product);
    }

    if (data.length < PAGE_SIZE) break; // última página

    from += PAGE_SIZE;
  }

    // Primero los productos con foto; dentro de cada grupo se mantiene el orden por clave
  const tieneFoto = (p: Product) => (p.imagenes?.length ?? 0) > 0;
  return all.sort((a, b) => Number(tieneFoto(b)) - Number(tieneFoto(a)));
}