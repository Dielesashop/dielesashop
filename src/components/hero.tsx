"use client";

import { Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";
import { ProductVisual } from "./product-visual";
import { products } from "@/lib/products";
import { formatMXN } from "@/lib/utils";
import { useCart } from "@/context/cart-context";

const featured = products[0];

export function Hero() {
  const { addItem } = useCart();

  return (
    <section className="relative overflow-hidden pt-36 pb-24 lg:pt-48 lg:pb-32">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-bg" />
        <div className="animate-aurora absolute -top-1/3 left-1/4 h-[36rem] w-[36rem] rounded-full bg-violet/30 blur-[110px]" />
        <div
          className="animate-aurora absolute -top-1/4 right-1/4 h-[30rem] w-[30rem] rounded-full bg-mint/20 blur-[110px]"
          style={{ animationDelay: "-6s" }}
        />
        <div
          className="animate-aurora absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber/10 blur-[110px]"
          style={{ animationDelay: "-11s" }}
        />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 0%, black, transparent)",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-white/[0.03] px-4 py-1.5 font-mono-ui text-xs text-muted">
            <Sparkles className="h-3.5 w-3.5 text-mint-soft" />
            Colección 2026 ya disponible
          </div>

          <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-7xl">
            Soluciones que  
            <br />
            energizan <span className="bg-gradient-to-r from-violet-soft via-violet to-mint-soft bg-clip-text text-transparent">tu proyecto</span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            DIELESA integra ferretería, material eléctrico y automatización industrial en un solo lugar. Herramientas confiables, componentes certificados y asesoría técnica para que tu obra no se detenga.

          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ShimmerButton
              onClick={() =>
                document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-base"
            >
              Ver catálogo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </ShimmerButton>
            <ShimmerButton variant="ghost" onClick={() => addItem(featured.id)}>
              Agregar {featured.name}
            </ShimmerButton>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted">
            <div className="flex items-center gap-2">
              ✅ Garantía en todos los productos


            </div>
            <div className="flex items-center gap-2">
              🚚 Envío a obra desde {formatMXN(1500)}
            </div>
            <div className="flex items-center gap-2">
              🛠️ Más de 10,000 productos en stock
            </div>
          </div>
        </div>

        {/* Floating featured product */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="animate-float relative rounded-[28px] border border-border/80 bg-surface/60 p-6 shadow-[0_30px_80px_-20px_rgba(127,90,240,0.35)] backdrop-blur">
            <div className="group relative flex h-64 items-center justify-center overflow-hidden rounded-2xl">
              <ProductVisual visual={featured.visual} className="relative flex h-full w-full items-center justify-center overflow-hidden" />
            </div>
            <div className="mt-5 flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-medium">{featured.name}</p>
                <p className="text-sm text-muted">{featured.tagline}</p>
              </div>
              <p className="font-mono-ui text-lg font-medium text-mint-soft">
                {formatMXN(featured.price)}
              </p>
            </div>

            {/* orbiting badge */}
            <div className="pointer-events-none absolute -top-6 right-10 hidden h-1 w-1 sm:block">
              <div className="animate-orbit relative">
                <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3 py-1 font-mono-ui text-[11px] text-mint-soft shadow-lg">
                  ● en stock
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-6 -z-10 h-full w-full rounded-[28px] border border-border/60 bg-surface/30" />
        </div>
      </div>
    </section>
  );
}
