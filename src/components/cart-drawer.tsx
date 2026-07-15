
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatMXN } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, detailedLines, subtotal, setQuantity, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Fondo oscuro */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          />

          {/* Panel lateral */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col border-l border-gray-200 bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
              <h2 className="text-lg font-bold text-gray-800">Tu carrito</h2>
              <button
                onClick={closeCart}
                aria-label="Cerrar carrito"
                className="rounded-full border border-gray-300 p-2 transition-colors hover:border-indigo-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Contenido */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {detailedLines.length === 0 ? (
                /* Carrito vacío */
                <div className="flex h-full flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag className="h-10 w-10 text-gray-300" strokeWidth={1.2} />
                  <p className="mt-4 text-sm">Tu carrito está vacío.</p>
                  <p className="mt-1 text-xs text-gray-400">
                    Agrega productos del catálogo para empezar.
                  </p>
                </div>
              ) : (
                /* Lista de productos */
                <ul className="space-y-5">
                  {detailedLines.map(({ product, quantity, lineTotal }) => (
                    <li key={product.clave} className="flex gap-4">
                      {/* Ícono / avatar del producto */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xl font-bold text-indigo-500">
                        {product.clave.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        {/* Nombre y botón eliminar */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {product.descripcion ?? product.clave}
                            </p>
                            <p className="mt-0.5 font-mono text-xs text-gray-500">
                              {formatMXN(product.precio ?? 0)} c/u
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(product.clave)}
                            aria-label={`Quitar ${product.descripcion}`}
                            className="text-gray-400 transition-colors hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Cantidad y total de línea */}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 rounded-full border border-gray-200">
                            <button
                              onClick={() => setQuantity(product.clave, quantity - 1)}
                              className="p-1.5 text-gray-400 transition-colors hover:text-gray-700"
                              aria-label="Disminuir cantidad"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="w-5 text-center font-mono text-xs font-medium">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(product.clave, quantity + 1)}
                              className="p-1.5 text-gray-400 transition-colors hover:text-gray-700"
                              aria-label="Aumentar cantidad"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="font-mono text-sm font-semibold text-gray-800">
                            {formatMXN(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer con subtotal */}
            {detailedLines.length > 0 && (
              <div className="border-t border-gray-200 px-6 py-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-mono font-bold text-gray-800">{formatMXN(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  Envío e impuestos se calculan al pagar.
                </p>
                <button
                  onClick={closeCart}
                  className="mt-5 w-full rounded-full bg-indigo-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
                >
                  Ir a pagar
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
