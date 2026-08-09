"use client";

import { useEffect, useState } from "react";
import { X, Package } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { formatMXN } from "@/lib/utils";

type Pedido = {
  id: number;
  user_id: string;
  total: number;
  estado: string;
  created_at: string;
};

type Cliente = {
  user_id: string;
  nombre: string;
  correo: string;
};

type PedidoItem = {
  id: number;
  producto_clave: string;
  descripcion: string | null;
  cantidad: number;
  precio_unitario: number;
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Record<string, Cliente>>({});
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<"todos" | "pendiente" | "surtido" | "enviado">("todos");

  // Modal
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState<Pedido | null>(null);
  const [items, setItems] = useState<PedidoItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(false);
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    async function load() {
      const { data: pedidosData, error } = await supabase
        .from("pedidos")
        .select("id, user_id, total, estado, created_at")
        .order("created_at", { ascending: false });

      if (error || !pedidosData) {
        setLoading(false);
        return;
      }
      setPedidos(pedidosData);

      const userIds = [...new Set(pedidosData.map((p) => p.user_id))];
      if (userIds.length > 0) {
        const { data: clientesData } = await supabase
          .from("clientes")
          .select("user_id, nombre, correo")
          .in("user_id", userIds);

        const map: Record<string, Cliente> = {};
        clientesData?.forEach((c) => (map[c.user_id] = c));
        setClientes(map);
      }
      setLoading(false);
    }
    load();
  }, []);

  async function abrirPedido(pedido: Pedido) {
    setPedidoSeleccionado(pedido);
    setLoadingItems(true);
    const { data } = await supabase
      .from("pedido_items")
      .select("id, producto_clave, descripcion, cantidad, precio_unitario")
      .eq("pedido_id", pedido.id);
    setItems(data ?? []);
    setLoadingItems(false);
  }

  function cerrarModal() {
    setPedidoSeleccionado(null);
    setItems([]);
  }

  async function marcarComoSurtido() {
    if (!pedidoSeleccionado) return;
    setActualizando(true);

    const { error } = await supabase
      .from("pedidos")
      .update({ estado: "surtido" })
      .eq("id", pedidoSeleccionado.id);

    if (!error) {
      setPedidos((prev) =>
        prev.map((p) => (p.id === pedidoSeleccionado.id ? { ...p, estado: "surtido" } : p))
      );
      setPedidoSeleccionado({ ...pedidoSeleccionado, estado: "surtido" });
    }
    setActualizando(false);
  }

  const filtrados = filtro === "todos" ? pedidos : pedidos.filter((p) => p.estado === filtro);

  if (loading) return <p className="text-sm text-gray-400">Cargando pedidos...</p>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">Pedidos</h2>
        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value as typeof filtro)}
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm"
        >
          <option value="todos">Todos</option>
          <option value="pendiente">Pendientes</option>
          <option value="surtido">Surtidos</option>
          <option value="enviado">Enviados</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3">Pedido</th>
              <th className="px-4 py-3">Cliente</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((p) => (
              <tr key={p.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <button
                    onClick={() => abrirPedido(p)}
                    className="font-medium text-indigo-600 hover:underline"
                  >
                    #{p.id}
                  </button>
                </td>
                <td className="px-4 py-3">
                  {clientes[p.user_id]?.nombre ?? "—"}
                  <p className="text-xs text-gray-400">{clientes[p.user_id]?.correo}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(p.created_at).toLocaleDateString("es-MX")}
                </td>
                <td className="px-4 py-3 font-mono">{formatMXN(p.total)}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      p.estado === "surtido"
                        ? "bg-green-100 text-green-700"
                        : p.estado === "enviado"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {p.estado}
                  </span>
                </td>
              </tr>
            ))}
            {filtrados.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No hay pedidos en este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de detalle del pedido */}
      {pedidoSeleccionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <div>
                <h3 className="font-bold text-gray-800">Pedido #{pedidoSeleccionado.id}</h3>
                <p className="text-xs text-gray-400">
                  {clientes[pedidoSeleccionado.user_id]?.nombre ?? "Cliente"} ·{" "}
                  {clientes[pedidoSeleccionado.user_id]?.correo}
                </p>
              </div>
              <button
                onClick={cerrarModal}
                className="rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto px-6 py-4">
              {loadingItems ? (
                <p className="text-sm text-gray-400">Cargando productos...</p>
              ) : items.length === 0 ? (
                <p className="text-sm text-gray-400">Este pedido no tiene productos registrados.</p>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-500">
                          <Package className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {item.descripcion ?? item.producto_clave}
                          </p>
                          <p className="font-mono text-xs text-gray-400">{item.producto_clave}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">×{item.cantidad}</p>
                        <p className="text-xs text-gray-400">{formatMXN(item.precio_unitario)} c/u</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
              <span className="font-mono text-sm font-bold text-gray-800">
                Total: {formatMXN(pedidoSeleccionado.total)}
              </span>
              {pedidoSeleccionado.estado === "surtido" ? (
                <span className="rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                  Ya surtido
                </span>
              ) : (
                <button
                  onClick={marcarComoSurtido}
                  disabled={actualizando}
                  className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
                >
                  {actualizando ? "Guardando..." : "Marcar como surtido"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}