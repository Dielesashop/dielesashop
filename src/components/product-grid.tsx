"use client";

import { useMemo, useState } from "react";
import { Search, X, PackageSearch } from "lucide-react";
import type { Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");

const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();

  if (!q) return products.slice(0, 25); // sin búsqueda → solo los primeros 25

  return products.filter((p) =>
    [p.clave, p.descripcion ?? ""].some((field) =>
      field.toLowerCase().includes(q)
    )
  ); // con búsqueda → busca en TODOS
}, [query, products]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      {/* Título */}
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Catálogo
        </p>
        <h2 className="mt-1 text-2xl font-bold text-gray-800">
          Inventario de Productos
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
          {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} para{" "}
          <span className="font-medium text-gray-800">"{query}"</span>
        </p>
      )}

      {/* Sin resultados */}
      {filtered.length === 0 ? (
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
        /* Grid de tarjetas */
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((p) => (
            <div
              key={p.clave}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Clave */}
              <p className="font-mono text-xs font-bold text-indigo-600">
                {p.clave}
              </p>

              {/* Descripción */}
              <h3 className="mt-2 text-sm font-semibold text-gray-800 line-clamp-2">
                {p.descripcion ?? "Sin descripción"}
              </h3>

              {/* Precio y existencia */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-gray-800">
                  $
                  {(p.precio ?? 0).toLocaleString("es-MX", {
                    minimumFractionDigits: 2,
                  })}
                </span>

                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    (p.existencia ?? 0) > 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {(p.existencia ?? 0) > 0
                    ? `${p.existencia} en stock`
                    : "Agotado"}
                </span>
              </div>

              {/* Fecha */}
              {p.actualizado_en && (
                <p className="mt-3 text-[11px] text-gray-400">
                  Actualizado:{" "}
                  {new Date(p.actualizado_en).toLocaleDateString("es-MX")}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
