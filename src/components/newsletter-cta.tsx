"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { ShimmerButton } from "./shimmer-button";

export function NewsletterCta() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 lg:px-10">
      <div className="relative overflow-hidden rounded-[32px] border border-border/80 bg-gradient-to-br from-violet/20 via-surface to-surface px-8 py-16 text-center sm:px-16">
        <div
          className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-violet/30 blur-[100px]"
          aria-hidden
        />
        <h2 className="relative font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Sé el primero en probar lo nuevo
        </h2>
        <p className="relative mx-auto mt-3 max-w-md text-muted">
          10% de descuento en tu primera compra y acceso anticipado a cada lanzamiento.
        </p>

        {sent ? (
          <div className="relative mx-auto mt-8 flex max-w-md items-center justify-center gap-2 rounded-full border border-mint-soft/40 bg-mint/10 px-6 py-3 text-sm text-mint-soft">
            <Check className="h-4 w-4" />
            Listo, revisa tu correo para tu código de descuento.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="relative mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              className="w-full rounded-full border border-border/80 bg-bg/60 px-5 py-3 text-sm text-ink placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none"
            />
            <ShimmerButton type="submit" className="shrink-0">
              Unirme
              <ArrowRight className="h-4 w-4" />
            </ShimmerButton>
          </form>
        )}
      </div>
    </section>
  );
}
