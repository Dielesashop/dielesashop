"use client";

import { useMemo, useState } from "react";
import { Search, X, PackageSearch } from "lucide-react";
import { categories, products, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { SectionHeading } from "./section-heading";

export function ProductGrid() {
  const [active, setActive] = useState<Product["category"] | "todos">("todos");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byCategory =
      active === "todos" ? products : products.filter((p) => p.category === active);

    const q = query.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter((p) =>
      [p.name, p.tagline, p.description, p.category].some((field) =>
        field.toLowerCase().includes(q)
      )
    );
  }, [active, query]);

  return (
    <section id="catalogo" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <SectionHeading
          eyebrow="Catálogo"
          title="Elige tu próximo objeto favorito"
          description="Ocho productos, un mismo estándar: materiales duraderos, software que mejora con el tiempo."
        />

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActive(cat.key)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                active === cat.key
                  ? "border-violet-soft/60 bg-violet/15 text-ink"
                  : "border-border/80 text-muted hover:border-violet-soft/40 hover:text-ink"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative mt-8 max-w-md">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca por nombre, categoría o característica..."
          className="w-full rounded-full border border-border/80 bg-surface/80 py-3 pl-11 pr-10 text-sm text-ink placeholder:text-muted/60 transition-colors focus:border-violet-soft/60 focus:outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            aria-label="Limpiar búsqueda"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted transition-colors hover:text-ink"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {query && (
        <p className="mt-3 font-mono-ui text-xs text-muted">
          {filtered.length} resultado{filtered.length !== 1 && "s"} para{" "}
          <span className="text-ink">&quot;{query}&quot;</span>
        </p>
      )}

      {filtered.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center gap-3 text-center text-muted">
          <PackageSearch className="h-10 w-10 text-muted/50" strokeWidth={1.2} />
          <p className="text-sm">No encontramos productos con esos filtros.</p>
          <button
            onClick={() => {
              setQuery("");
              setActive("todos");
            }}
            className="text-sm text-violet-soft underline underline-offset-4"
          >
            Limpiar búsqueda y filtros
          </button>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
