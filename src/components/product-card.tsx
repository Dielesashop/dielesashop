"use client";

import { useRef, useState } from "react";
import { Plus, Star, Flame } from "lucide-react";
import type { Product } from "@/lib/products";
import { formatMXN, cn } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 50, y: 0 });
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  const discount = product.compareAt
    ? Math.round(100 - (product.price / product.compareAt) * 100)
    : null;
  const lowStock = product.stock <= 20;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  function handleAdd() {
    addItem(product.id);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.09] to-white/[0.02] shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition-all duration-300 hover:-translate-y-1 hover:border-violet-soft/50 hover:shadow-[0_20px_50px_-15px_rgba(240,120,56,0.35)]"
    >
      {/* cursor spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(320px circle at ${pos.x}% ${pos.y}%, rgba(240,120,56,0.16), transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
        {product.badge && (
          <span className="rounded-full border border-white/10 bg-bg/80 px-3 py-1 font-mono-ui text-[11px] text-mint-soft backdrop-blur">
            {product.badge}
          </span>
        )}
        {discount && (
          <span className="flex items-center gap-1 rounded-full bg-violet px-3 py-1 font-mono-ui text-[11px] font-semibold text-white">
            <Flame className="h-3 w-3" />-{discount}%
          </span>
        )}
      </div>

      <ProductVisual
        visual={product.visual}
        className="relative flex h-56 w-full items-center justify-center overflow-hidden"
      />

      <div className="relative z-20 p-6">
        <div className="flex items-center gap-1 text-xs text-muted">
          <Star className="h-3.5 w-3.5 fill-amber text-amber" />
          {product.rating}
          <span className="text-muted/60">({product.reviews})</span>
          {lowStock && (
            <span className="ml-auto font-mono-ui text-[11px] text-violet-soft">
              ¡Quedan {product.stock}!
            </span>
          )}
        </div>

        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted">{product.tagline}</p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-soft to-mint-soft bg-clip-text text-transparent">
            {formatMXN(product.price)}
          </span>
          {product.compareAt && (
            <span className="font-mono-ui text-xs text-muted line-through">
              {formatMXN(product.compareAt)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="group/btn relative mt-5 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-ink py-2.5 text-sm font-semibold text-bg transition-all duration-300 hover:bg-violet-soft active:scale-[0.98]"
        >
          <span
            className={cn(
              "flex items-center gap-2 transition-transform duration-300",
              justAdded && "translate-y-8"
            )}
          >
            <Plus className="h-4 w-4" strokeWidth={2.4} />
            Agregar al carrito
          </span>
          <span
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2 bg-mint text-white transition-transform duration-300",
              justAdded ? "translate-y-0" : "-translate-y-8"
            )}
          >
            ¡Agregado!
          </span>
        </button>
      </div>
    </div>
  );
}
