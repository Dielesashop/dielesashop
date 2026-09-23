"use client";

import { useMemo, useState } from "react";
import { Search, X, PackageSearch } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import { ProductCard } from "./product-card";
import TextType from "./texttype";
import { normalize, compact } from "@/utils/cn";

const MAX_RESULTS = 200;

export function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const { addItem } = useCart();

  // Índice de búsqueda: se calcula solo cuando cambian los productos
  const index = useMemo(
    () =>
      products.map((product) => {
        const clave = normalize(product.clave);
        const desc = normalize(product.descripcion);
        return {
          product,
          claveCompact: compact(clave),
          descCompact: compact(desc),
          text: `${clave} ${desc}`,
        };
      }),
    [products]
  );

  const filtered = useMemo(() => {
    const q = normalize(query);
    if (!q) return products.slice(0, 25);

    const tokens = q.split(" ").filter(Boolean);
    const qCompact = compact(q);

    return index
      .filter((item) =>
        tokens.every(
          (token) =>
            // coincidencia normal, o "compacta" (ignora espacios/guiones/puntos)
            item.text.includes(token) ||
            item.claveCompact.includes(token) ||
            item.descCompact.includes(token)
        ) ||
        // la búsqueda completa pegada también puede coincidir con la clave
        item.claveCompact.includes(qCompact)
      )
      .map((item) => {
        // Ranking: clave exacta > empieza con > el resto
        let score = 2;
        if (item.claveCompact === qCompact) score = 0;
        else if (item.claveCompact.startsWith(qCompact)) score = 1;
        return { product: item.product, score };
      })
      .sort((a, b) => a.score - b.score)
      .map((r) => r.product);
  }, [query, index, products]);

  const visible = filtered.slice(0, MAX_RESULTS);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      {/* Título */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
          <TextType
            text={["Catálogo"]}
            as="span"
            typingSpeed={75}
            deletingSpeed={50}
            pauseDuration={99999}
            loop={false}
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
          />
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-800">
          <TextType
            text={["Inventario de Productos", "Encuentra lo que necesitas"]}
            as="span"
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={2500}
            loop
            showCursor
            cursorCharacter="_"
            cursorBlinkDuration={0.5}
            initialDelay={800}
          />
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {products.length} producto{products.length !== 1 ? "s" : ""} en total
        </p>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por clave o descripción..."
          className="w-full rounded-full border border-gray-300 bg-white py-3 pl-11 pr-10 text-sm text-gray-800 placeholder:text-gray-400 transition-colors focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <p className="mt-3 text-xs text-gray-500">
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
          {filtered.length > MAX_RESULTS && ` (mostrando ${MAX_RESULTS})`} para{" "}
          <span className="font-medium text-gray-800">"{query}"</span>
        </p>
      )}

      {/* Sin resultados */}
      {visible.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center text-gray-400">
          <PackageSearch className="h-10 w-10 text-gray-300" strokeWidth={1.2} />
          <p className="text-sm">No encontramos productos con esa búsqueda.</p>
          <button
            onClick={() => setQuery("")}
            className="text-sm text-indigo-500 underline underline-offset-4"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visible.map((p) => (
            <ProductCard key={p.clave} product={p} onAdd={addItem} />
          ))}
        </div>
      )}
    </section>
  );
}