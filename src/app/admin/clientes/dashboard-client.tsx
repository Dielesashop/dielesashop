"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  Cell,
} from "recharts";

const PRODUCT_BAR_COLORS = ["#ff6d1f", "#a855f7", "#3b82f6", "#22c55e", "#ec4899", "#eab308"];

export type VentaDetalle = {
  pedido_id: number;
  created_at: string;
  pedido_total: number;
  estado: string;
  user_id: string;
  cliente_nombre: string;
  cliente_correo: string;
  producto_clave: string;
  producto_descripcion: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
};

export type Producto = {
  clave: string;
  descripcion: string;
  existencia: number;
  precio: number;
};

type Periodo = "semana" | "mes" | "todo";

const ESTADOS_EXCLUIDOS = ["cancelado", "cancelada"];
const UMBRAL_STOCK_BAJO = 10;

const COLORS = {
  bg: "#120d0a",
  card: "#1a1118",
  orange: "#ff6d1f",
  purple: "#a855f7",
  blue: "#3b82f6",
  green: "#22c55e",
  pink: "#ec4899",
  yellow: "#eab308",
};

function fmtMoney(n: number) {
  return n.toLocaleString("es-MX", { style: "currency", currency: "MXN" });
}

function withinPeriod(dateStr: string, periodo: Periodo) {
  if (periodo === "todo") return true;
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  if (periodo === "semana") return diffDays <= 7;
  if (periodo === "mes") return diffDays <= 30;
  return true;
}

export default function DashboardClient({
  ventas,
  productos,
}: {
  ventas: VentaDetalle[];
  productos: Producto[];
}) {
  const [periodo, setPeriodo] = useState<Periodo>("semana");

  const ventasFiltradas = useMemo(
    () =>
      ventas.filter(
        (v) =>
          withinPeriod(v.created_at, periodo) &&
          !ESTADOS_EXCLUIDOS.includes((v.estado ?? "").toLowerCase())
      ),
    [ventas, periodo]
  );

  const kpis = useMemo(() => {
    const pedidosUnicos = new Set(ventasFiltradas.map((v) => v.pedido_id));
    const ingresos = ventasFiltradas.reduce((acc, v) => acc + Number(v.subtotal), 0);
    const numPedidos = pedidosUnicos.size;
    const ticketPromedio = numPedidos > 0 ? ingresos / numPedidos : 0;
    const unidadesVendidas = ventasFiltradas.reduce((acc, v) => acc + Number(v.cantidad), 0);
    return { ingresos, numPedidos, ticketPromedio, unidadesVendidas };
  }, [ventasFiltradas]);

  const topProductos = useMemo(() => {
    const map = new Map<string, { descripcion: string; unidades: number; ingresos: number }>();
    for (const v of ventasFiltradas) {
      const prev = map.get(v.producto_clave) ?? {
        descripcion: v.producto_descripcion,
        unidades: 0,
        ingresos: 0,
      };
      prev.unidades += Number(v.cantidad);
      prev.ingresos += Number(v.subtotal);
      map.set(v.producto_clave, prev);
    }
    return Array.from(map.entries())
      .map(([clave, d]) => ({ clave, ...d }))
      .sort((a, b) => b.ingresos - a.ingresos)
      .slice(0, 6);
  }, [ventasFiltradas]);

  const topClientes = useMemo(() => {
    const map = new Map<string, { nombre: string; correo: string; gasto: number; pedidos: Set<number> }>();
    for (const v of ventasFiltradas) {
      const prev = map.get(v.user_id) ?? {
        nombre: v.cliente_nombre,
        correo: v.cliente_correo,
        gasto: 0,
        pedidos: new Set<number>(),
      };
      prev.gasto += Number(v.subtotal);
      prev.pedidos.add(v.pedido_id);
      map.set(v.user_id, prev);
    }
    const arr = Array.from(map.values())
      .map((d) => ({ ...d, numPedidos: d.pedidos.size }))
      .sort((a, b) => b.gasto - a.gasto)
      .slice(0, 5);
    const maxGasto = arr[0]?.gasto ?? 1;
    return arr.map((c) => ({ ...c, pct: (c.gasto / maxGasto) * 100 }));
  }, [ventasFiltradas]);

  const ventasPorDia = useMemo(() => {
    const map = new Map<string, number>();
    for (const v of ventasFiltradas) {
      const dia = new Date(v.created_at).toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "short",
      });
      map.set(dia, (map.get(dia) ?? 0) + Number(v.subtotal));
    }
    return Array.from(map.entries())
      .map(([dia, total]) => ({ dia, total }))
      .reverse();
  }, [ventasFiltradas]);

  const stockBajo = useMemo(
    () =>
      productos
        .filter((p) => Number(p.existencia) <= UMBRAL_STOCK_BAJO)
        .sort((a, b) => Number(a.existencia) - Number(b.existencia))
        .slice(0, 6),
    [productos]
  );

  const sinDatos = ventasFiltradas.length === 0;

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: COLORS.bg }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Panel de Clientes y Ventas</h1>
            <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-sm mt-1">
              Resumen interactivo del desempeño de tu negocio
            </p>
          </div>
          <div className="flex gap-2 p-1 rounded-2xl" style={{ background: "rgba(255,109,31,0.08)", border: "1px solid rgba(255,109,31,0.2)" }}>
            {(["semana", "mes", "todo"] as Periodo[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriodo(p)}
                className="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
                style={{
                  background: periodo === p ? "linear-gradient(135deg, #ff6d1f, #e85a0f)" : "transparent",
                  color: periodo === p ? "#fff" : "rgba(255,255,255,0.5)",
                  boxShadow: periodo === p ? "0 0 20px rgba(255,109,31,0.4)" : "none",
                }}
              >
                {p === "semana" ? "Esta semana" : p === "mes" ? "Este mes" : "Todo"}
              </button>
            ))}
          </div>
        </div>

        {sinDatos ? (
          <div
            className="rounded-3xl p-12 text-center"
            style={{ background: COLORS.card, border: "1px solid rgba(255,109,31,0.15)" }}
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="text-xl font-bold text-white mb-2">Aún no hay ventas en este periodo</h2>
            <p style={{ color: "rgba(255,255,255,0.4)" }}>
              En cuanto se registren pedidos, aquí verás las métricas automáticamente.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KpiCard emoji="💰" label="Ingresos" value={fmtMoney(kpis.ingresos)} color={COLORS.orange} />
              <KpiCard emoji="🧾" label="Pedidos" value={kpis.numPedidos.toString()} color={COLORS.blue} />
              <KpiCard emoji="🎯" label="Ticket promedio" value={fmtMoney(kpis.ticketPromedio)} color={COLORS.purple} />
              <KpiCard emoji="📦" label="Unidades vendidas" value={kpis.unidadesVendidas.toString()} color={COLORS.green} />
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <Card title="Ventas por día" emoji="📈">
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={ventasPorDia}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                    <XAxis dataKey="dia" stroke="rgba(255,255,255,0.4)" fontSize={12} />
                    <YAxis stroke="rgba(255,255,255,0.4)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                    <Tooltip
                      contentStyle={{ background: "#1a1118", border: "1px solid rgba(255,109,31,0.3)", borderRadius: 12 }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(v) => [fmtMoney(Number(v ?? 0)), "Ventas"]}
                    />
                    <Line type="monotone" dataKey="total" stroke={COLORS.orange} strokeWidth={3} dot={{ fill: COLORS.orange }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Productos más vendidos" emoji="🔥">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={topProductos} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.4)" fontSize={12} tickFormatter={(v) => `$${v}`} />
                    <YAxis
                      type="category"
                      dataKey="descripcion"
                      stroke="rgba(255,255,255,0.4)"
                      fontSize={12}
                      width={110}
                      tickFormatter={(v: string) => (v.length > 14 ? v.slice(0, 14) + "…" : v)}
                    />
                    <Tooltip
                      contentStyle={{ background: "#1a1118", border: "1px solid rgba(255,109,31,0.3)", borderRadius: 12 }}
                      formatter={(v, _name, props) => [
                        `${fmtMoney(Number(v ?? 0))} · ${props.payload?.unidades ?? 0} uds`,
                        "Ingresos",
                      ]}
                    />
                    <Bar dataKey="ingresos" radius={[0, 8, 8, 0]}>
                      {topProductos.map((_, i) => (
                        <Cell key={i} fill={PRODUCT_BAR_COLORS[i % PRODUCT_BAR_COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card title="Clientes con más compras" emoji="🏆">
                <div className="space-y-4">
                  {topClientes.map((c, i) => (
                    <div key={c.correo}>
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: [COLORS.orange, COLORS.purple, COLORS.blue, COLORS.green, COLORS.pink][i] }}
                          >
                            {i + 1}
                          </span>
                          <span className="text-white text-sm font-semibold">{c.nombre}</span>
                        </div>
                        <span className="text-sm font-bold" style={{ color: COLORS.orange }}>
                          {fmtMoney(c.gasto)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${c.pct}%`,
                            background: [COLORS.orange, COLORS.purple, COLORS.blue, COLORS.green, COLORS.pink][i],
                          }}
                        />
                      </div>
                      <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>
                        {c.numPedidos} pedido{c.numPedidos !== 1 ? "s" : ""}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card title="Alerta de inventario bajo" emoji="⚠️">
                {stockBajo.length === 0 ? (
                  <p style={{ color: "rgba(255,255,255,0.4)" }} className="text-sm">
                    Todo tu inventario tiene niveles saludables 🎉
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stockBajo.map((p) => (
                      <div
                        key={p.clave}
                        className="flex justify-between items-center rounded-xl px-4 py-3"
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                      >
                        <span className="text-sm text-white">{p.descripcion}</span>
                        <span className="text-sm font-bold text-red-400">{p.existencia} uds</span>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function KpiCard({ emoji, label, value, color }: { emoji: string; label: string; value: string; color: string }) {
  return (
    <div
      className="rounded-2xl p-5"
      style={{ background: "#1a1118", border: `1px solid ${color}33`, boxShadow: `0 0 25px ${color}22` }}
    >
      <div className="text-2xl mb-2">{emoji}</div>
      <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </p>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
}

function Card({ title, emoji, children }: { title: string; emoji: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6" style={{ background: "#1a1118", border: "1px solid rgba(255,109,31,0.15)" }}>
      <h3 className="text-white font-bold mb-4 flex items-center gap-2">
        <span>{emoji}</span> {title}
      </h3>
      {children}
    </div>
  );
}