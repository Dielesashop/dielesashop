import { supabase } from "./client";
import type { Product } from "@/lib/products";

/**
 * Trae el catálogo desde la tabla `productos` en Supabase.
 * Si algo falla devuelve un arreglo vacío.
 */
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select("clave, descripcion, existencia, precio, actualizado_en")
    .order("clave", { ascending: true });

  if (error) {
    console.warn("[Supabase] Error:", error.message);
    return [];
  }

  return (data ?? []) as Product[];
}
