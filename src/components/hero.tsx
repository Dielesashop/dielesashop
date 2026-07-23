"use client";

import { ArrowRight, Sparkles, Package } from "lucide-react";
import type { Product } from "@/lib/products";
import { useCart } from "@/context/cart-context";
import BlurText from "@/components/blurtext";

function formatMXN(value: number) {
  return value.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  });
}

export function Hero({ featured }: { featured: Product | null }) {
  const { addItem } = useCart();

  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-28">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gray-50" />
        <div className="absolute -top-1/3 left-1/4 h-[36rem] w-[36rem] animate-pulse rounded-full bg-indigo-400/20 blur-[110px]" />
        <div
          className="absolute -top-1/4 right-1/4 h-[30rem] w-[30rem] animate-pulse rounded-full bg-emerald-400/15 blur-[110px]"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] animate-pulse rounded-full bg-amber-400/10 blur-[110px]"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        {/* Texto principal */}
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-1.5 text-xs font-medium text-gray-600 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-emerald-500" />
            Catálogo 2026 ya disponible
          </div>

          {/* Título con BlurText — cada línea animada por separado */}
          <div className="mt-6">
            <BlurText
              text="Productos de ferretería, material eléctrico y automatización industrial"
              delay={120}
              animateBy="words"
              direction="top"
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            />
          </div>

          {/* Descripción
          <BlurText
            text="DIELESA integra ferretería, material eléctrico y automatización industrial en un solo lugar. Herramientas confiables, componentes certificados y asesoría técnica para que tu obra no se detenga."
            delay={40}
            animateBy="words"
            direction="bottom"
            stepDuration={0.3}
            className="mt-6 max-w-lg text-lg leading-relaxed text-gray-500"
          /> */}

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group inline-flex items-center gap-2 rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 hover:shadow-xl hover:shadow-indigo-200"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            {featured && (
              <button
                onClick={() => addItem(featured.clave)}
                className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all hover:border-indigo-300 hover:text-indigo-700"
              >
                Agregar {featured.clave}
              </button>
            )}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <div className="flex items-center gap-2">✅ Garantía en todos los productos</div>
            <div className="flex items-center gap-2">
              🚚 Envío a obra desde {formatMXN(1500)}
            </div>
            <div className="flex items-center gap-2">🛠️ Más de 10,000 productos en stock</div>
          </div>
        </div>

        {/* Tarjeta del producto destacado */}
        {featured && (
          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rounded-3xl border border-gray-200 bg-white/70 p-6 shadow-2xl shadow-indigo-100/50 backdrop-blur">
              <div className="flex h-56 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-emerald-50">
                <Package className="h-24 w-24 text-indigo-300" strokeWidth={1} />
              </div>

              <div className="mt-5 flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-xs font-bold text-indigo-600">
                    {featured.clave}
                  </p>
                  <p className="mt-1 text-sm font-medium text-gray-800 line-clamp-2">
                    {featured.descripcion ?? "Sin descripción"}
                  </p>
                </div>
                <p className="shrink-0 text-lg font-bold text-emerald-600">
                  {formatMXN(featured.precio ?? 0)}
                </p>
              </div>

              {/* Badge de stock */}
              <div className="absolute -top-3 right-8">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold shadow-lg ${
                    (featured.existencia ?? 0) > 0
                      ? "border-green-200 bg-white text-green-600"
                      : "border-red-200 bg-white text-red-600"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      (featured.existencia ?? 0) > 0 ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  {(featured.existencia ?? 0) > 0
                    ? `${featured.existencia} en stock`
                    : "Agotado"}
                </span>
              </div>
            </div>

            {/* Tarjeta decorativa detrás */}
            <div className="absolute -bottom-4 -left-4 -z-10 h-full w-full rounded-3xl border border-gray-100 bg-gray-50/50" />
          </div>
        )}
      </div>
    </section>
  );
}
