"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Info, LogIn } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { formatMXN } from "@/lib/utils";
import { ProductVisual } from "@/components/product-visual";
import { ShimmerButton } from "@/components/shimmer-button";
import { supabase } from "@/lib/supabase/client";

const SHIPPING = 149;

export default function CheckoutPage() {
  const { detailedLines, subtotal, clear } = useCart();
  const { isAuthenticated, hydrated, user } = useAuth();
  const [placed, setPlaced] = useState(false);

  const shipping = detailedLines.length === 0 ? 0 : subtotal >= 1500 ? 0 : SHIPPING;
  const total = subtotal + shipping;

async function handleSubmit(e: FormEvent) {
  e.preventDefault();
  if (!user) return;

  const res = await fetch("/api/checkout/confirm", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: user.id,
      items: detailedLines.map(({ product, quantity }) => ({
        clave: product.clave,
        descripcion: product.descripcion,
        quantity,
        precio: product.precio,
      })),
    }),
  });

  const result = await res.json();
  if (result.success) {
    setPlaced(true);
    clear();
  }
}

  if (hydrated && !isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet/15 text-violet-soft">
          <LogIn className="h-7 w-7" />
        </div>
        <h1 className="mt-6 font-display text-2xl font-medium sm:text-3xl">
          Inicia sesión para continuar tu compra
        </h1>
        <p className="mt-3 max-w-sm text-muted">
          Necesitas una cuenta para finalizar tu pedido y darle seguimiento.
        </p>
        <Link href="/login?redirect=/checkout" className="mt-8">
          <ShimmerButton className="text-base">Iniciar sesión</ShimmerButton>
        </Link>
        <Link href="/" className="mt-5 text-sm text-muted hover:text-ink">
          Volver a la tienda
        </Link>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <CheckCircle2 className="h-14 w-14 text-mint-soft" strokeWidth={1.3} />
        <h1 className="mt-6 font-display text-3xl font-medium">¡Pedido recibido!</h1>
        <p className="mt-3 max-w-sm text-muted">
          Esto es una demostración local: no se realizó ningún cobro real. En producción,
          aquí se conectaría un procesador de pagos.
        </p>
        <Link href="/" className="mt-8">
          <ShimmerButton>Volver a la tienda</ShimmerButton>
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-16 lg:px-10">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink">
        <ArrowLeft className="h-4 w-4" />
        Volver a la tienda
      </Link>

      <h1 className="mt-6 font-display text-3xl font-medium sm:text-4xl">Finalizar compra</h1>
      {user && (
        <p className="mt-1 text-sm text-muted">
          {user && (
            <p className="mt-1 text-sm text-muted">
              Hola, <span className="text-violet-soft">{user.email}</span> — completa tus datos de envío.
            </p>
          )}
        </p>
      )}

      {detailedLines.length === 0 ? (
        <p className="mt-6 text-muted">
          Tu carrito está vacío.{" "}
          <Link href="/#catalogo" className="text-violet-soft underline underline-offset-4">
            Ver catálogo
          </Link>
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <form onSubmit={handleSubmit} className="space-y-8">
            <fieldset className="space-y-4">
              <legend className="font-display text-lg font-medium">Contacto y envío</legend>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  required
                  placeholder="Nombre completo"
                  className="rounded-xl border border-border/80 bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none"
                />
                <input
                  required
                  type="email"
                  placeholder="Correo electrónico"
                  className="rounded-xl border border-border/80 bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none"
                />
                <input
                  required
                  placeholder="Dirección"
                  className="rounded-xl border border-border/80 bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none sm:col-span-2"
                />
                <input
                  required
                  placeholder="Ciudad"
                  className="rounded-xl border border-border/80 bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none"
                />
                <input
                  required
                  placeholder="Código postal"
                  className="rounded-xl border border-border/80 bg-surface px-4 py-3 text-sm placeholder:text-muted/60 focus:border-violet-soft/60 focus:outline-none"
                />
              </div>
            </fieldset>

            <fieldset className="space-y-3 rounded-2xl border border-border/80 bg-surface/50 p-5">
              <div className="flex items-start gap-2 text-xs text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                Este es un checkout de demostración. No se procesan pagos reales ni se
                guardan datos de tarjetas. Para producción, integra Stripe, MercadoPago
                o Conekta en este paso.
              </div>
            </fieldset>

            <ShimmerButton type="submit" className="w-full text-base">
              Confirmar pedido — {formatMXN(total)}
            </ShimmerButton>
          </form>

          <aside className="h-fit rounded-3xl border border-border/80 bg-surface p-6">
            <h2 className="font-display text-lg font-medium">Resumen</h2>
            <ul className="mt-5 space-y-4">
              {detailedLines.map(({ product, quantity, lineTotal }) => (
                <li key={product.clave} className="flex items-center gap-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-surface-2 font-mono-ui text-[10px] text-muted">
                    {product.clave}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{product.descripcion ?? "Sin descripción"}</p>
                    <p className="text-xs text-muted">Cantidad: {quantity}</p>
                  </div>
                  <span className="font-mono-ui text-sm">{formatMXN(lineTotal)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-2 border-t border-border/80 pt-5 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono-ui text-ink">{formatMXN(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted">
                <span>Envío</span>
                <span className="font-mono-ui text-ink">
                  {shipping === 0 ? "Gratis" : formatMXN(shipping)}
                </span>
              </div>
              <div className="flex justify-between border-t border-border/80 pt-3 font-medium">
                <span>Total</span>
                <span className="font-mono-ui text-mint-soft">{formatMXN(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
