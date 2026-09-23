import { supabase } from "./client";
import type { Product } from "@/lib/products";

const PAGE_SIZE = 1000;

/**
 * Trae TODO el catálogo desde la tabla `productos` en Supabase,
 * pidiendo de 1000 en 1000 (el límite por defecto de la API).
 * Si algo falla devuelve un arreglo vacío.
 */
export async function getProducts(): Promise<Product[]> {
  const all: Product[] = [];
  let from = 0;

  while (true) {
    const { data, error } = await supabase
      .from("productos")
      .select("clave, descripcion, existencia, precio, actualizado_en")
      .order("clave", { ascending: true })
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      console.warn("[Supabase] Error:", error.message);
      return [];
    }

    if (!data || data.length === 0) break;

    all.push(...(data as Product[]));

    if (data.length < PAGE_SIZE) break; // última página

    from += PAGE_SIZE;
  }

  return all;
}