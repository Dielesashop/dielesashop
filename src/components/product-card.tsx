import { useRef, useState } from "react";
import { Plus, Package } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn } from "@/utils/cn";
import { useCart } from "@/context/cart-context";

function formatMXN(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
}

export function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 0 });
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const stock = product.existencia ?? 0;
  const lowStock = stock > 0 && stock <= 20;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleAdd() {
    addItem(product.clave);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100/50"
    >
      {/* Cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, rgba(99,102,241,0.08), transparent 65%)`,
        }}
        aria-hidden
      />

      {/* Badge de stock */}
      <div className="absolute left-3 top-3 z-20">
        {stock === 0 && (
          <span className="rounded-full bg-red-100 px-3 py-1 text-[11px] font-bold text-red-600">
            Agotado
          </span>
        )}
        {lowStock && (
          <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-bold text-amber-700">
            ¡Quedan {stock}!
          </span>
        )}
      </div>

      {/* Ícono visual */}
      <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-indigo-50 to-emerald-50">
        <Package className="h-16 w-16 text-indigo-200" strokeWidth={1} />
      </div>

      {/* Info */}
      <div className="relative z-20 p-5">
        {/* Clave */}
        <p className="font-mono text-xs font-bold text-indigo-600">
          {product.clave}
        </p>

        {/* Descripción */}
        <h3 className="mt-1.5 text-sm font-semibold text-gray-800 line-clamp-2">
          {product.descripcion ?? "Sin descripción"}
        </h3>

        {/* Existencia */}
        <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              stock > 0 ? "bg-green-500" : "bg-red-400"
            )}
          />
          {stock > 0 ? `${stock} en stock` : "Sin existencia"}
        </div>

        {/* Precio */}
        <div className="mt-3">
          <span className="text-xl font-bold text-gray-800">
            {formatMXN(product.precio ?? 0)}
          </span>
        </div>

        {/* Botón agregar */}
        <button
          onClick={handleAdd}
          disabled={stock === 0}
          className={cn(
            "relative mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full py-2.5 text-sm font-semibold transition-all duration-300 active:scale-[0.98]",
            stock > 0
              ? "bg-indigo-600 text-white hover:bg-indigo-700"
              : "cursor-not-allowed bg-gray-100 text-gray-400"
          )}
        >
          <span
            className={cn(
              "flex items-center gap-2 transition-transform duration-300",
              justAdded && "translate-y-8"
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            {stock > 0 ? "Agregar al carrito" : "No disponible"}
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2 bg-emerald-500 text-white transition-transform duration-300",
              justAdded ? "translate-y-0" : "-translate-y-full"
            )}
          >
            ✓ ¡Agregado!
          </span>
        </button>
      </div>
    </div>
  );
}
