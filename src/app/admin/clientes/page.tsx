import { supabaseAdmin } from "@/lib/supabase/supabaseAdmin";
import DashboardClient, { VentaDetalle, Producto } from "./dashboard-client";

export const dynamic = "force-dynamic";

export default async function AdminClientesPage() {
  const { data: ventas, error: ventasError } = await supabaseAdmin
    .from("vista_ventas_detalle")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: productos, error: productosError } = await supabaseAdmin
    .from("productos")
    .select("clave, descripcion, existencia, precio");

  if (ventasError || productosError) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#120d0a" }}>
        <div className="text-red-400 p-6">
          Error cargando datos: {ventasError?.message || productosError?.message}
        </div>
      </div>
    );
  }

  return (
    <DashboardClient
      ventas={(ventas ?? []) as VentaDetalle[]}
      productos={(productos ?? []) as Producto[]}
    />
  );
}