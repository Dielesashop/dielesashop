/** Coincide exactamente con la tabla `productos` en Supabase */
export interface Product {
  clave: string;
  descripcion: string | null;
  existencia: number | null;
  precio: number | null;
  actualizado_en: string | null;
}
