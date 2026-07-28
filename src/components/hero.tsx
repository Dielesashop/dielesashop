"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import BlurText from "@/components/blurtext";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-28 min-h-[600px] lg:min-h-[700px]">
      {/* Background image */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/img/dielesa_back.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "scroll",
        }}
      />

      {/* Dark overlay so text is readable */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-black/55" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-medium text-white backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-orange-400" />
          Catálogo 2026 ya disponible
        </div>

        {/* Title */}
        <div className="mt-6 max-w-3xl">
          <BlurText
            text="Productos de ferretería, material eléctrico y automatización industrial"
            delay={120}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          />
        </div>

        {/* Single catalog button */}
        <div className="mt-9">
          <button
            onClick={() =>
              document
                .getElementById("catalogo")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-900/40 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-900/50"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Badges */}
        <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">✅ Garantía en todos los productos</div>
          <div className="flex items-center gap-2">🚚 Envío a obra disponible</div>
          <div className="flex items-center gap-2">🛠️ Más de 10,000 productos en stock</div>
        </div>
      </div>
    </section>
  );
}