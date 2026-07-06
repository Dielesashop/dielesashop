"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatMXN } from "@/lib/utils";
import { ProductVisual } from "./product-visual";
import { ShimmerButton } from "./shimmer-button";

export function CartDrawer() {
  const { isOpen, closeCart, detailedLines, subtotal, setQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-border/80 bg-bg"
          >
            <div className="flex items-center justify-between border-b border-border/80 px-6 py-5">
              <h2 className="font-display text-lg font-medium">Tu carrito</h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="rounded-full border border-border/80 p-2 transition-colors hover:border-violet-soft/60"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {detailedLines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center text-muted">
                  <ShoppingBag className="h-10 w-10 text-muted/50" strokeWidth={1.2} />
                  <p className="mt-4 text-sm">Tu carrito está vacío.</p>
                  <p className="mt-1 text-xs text-muted/70">
                    Agrega productos del catálogo para empezar.
                  </p>
                </div>
              ) : (
                <ul className="space-y-5">
                  {detailedLines.map(({ product, quantity, lineTotal }) => (
                    <li key={product.id} className="flex gap-4">
                      <ProductVisual
                        visual={product.visual}
                        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl [&>svg]:h-8 [&>svg]:w-8"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-display text-sm font-medium">{product.name}</p>
                            <p className="mt-0.5 font-mono-ui text-xs text-muted">
                              {formatMXN(product.price)}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(product.id)}
                            aria-label={`Quitar ${product.name}`}
                            className="text-muted transition-colors hover:text-ink"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-border/80">
                            <button
                              onClick={() => setQuantity(product.id, quantity - 1)}
                              className="p-1.5 text-muted transition-colors hover:text-ink"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center font-mono-ui text-xs">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(product.id, quantity + 1)}
                              className="p-1.5 text-muted transition-colors hover:text-ink"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-mono-ui text-sm">{formatMXN(lineTotal)}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {detailedLines.length > 0 && (
              <div className="border-t border-border/80 px-6 py-6">
                <div className="flex items-center justify-between text-sm text-muted">
                  <span>Subtotal</span>
                  <span className="font-mono-ui text-ink">{formatMXN(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-muted/70">Envío e impuestos se calculan al pagar.</p>
                <Link href="/checkout" onClick={closeCart} className="mt-5 block">
                  <ShimmerButton className="w-full">Ir a pagar</ShimmerButton>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
