// ✅ Correcto — primera línea del archivo
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/lib/products";

export type CartLine = {
  clave: string;       // ← antes era productId
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (clave: string, quantity?: number) => void;
  removeItem: (clave: string) => void;
  setQuantity: (clave: string, quantity: number) => void;
  clear: () => void;
  itemCount: number;
  subtotal: number;
  detailedLines: { product: Product; quantity: number; lineTotal: number }[];
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "aether-cart-v1";

/**
 * Recibe los productos como prop porque vienen de Supabase (async).
 */
export function CartProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Hidratar desde localStorage
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // Persistir en localStorage
  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((clave: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.clave === clave);
      if (existing) {
        return prev.map((l) =>
          l.clave === clave ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [...prev, { clave, quantity }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((clave: string) => {
    setLines((prev) => prev.filter((l) => l.clave !== clave));
  }, []);

  const setQuantity = useCallback((clave: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.clave !== clave);
      return prev.map((l) => (l.clave === clave ? { ...l, quantity } : l));
    });
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const detailedLines = useMemo(
    () =>
      lines
        .map((l) => {
          const product = products.find((p) => p.clave === l.clave); // ← antes: p.id
          if (!product) return null;
          return {
            product,
            quantity: l.quantity,
            lineTotal: (product.precio ?? 0) * l.quantity, // ← antes: product.price
          };
        })
        .filter(
          (x): x is { product: Product; quantity: number; lineTotal: number } =>
            !!x
        ),
    [lines, products]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => detailedLines.reduce((sum, l) => sum + l.lineTotal, 0),
    [detailedLines]
  );

  const value: CartContextValue = {
    lines,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    setQuantity,
    clear,
    itemCount,
    subtotal,
    detailedLines,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
