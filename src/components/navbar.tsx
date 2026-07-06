"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./shimmer-button";

const LINKS = [
  { href: "#catalogo", label: "Catálogo" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "border-b border-border/80 bg-bg/80 backdrop-blur-xl" : "bg-transparent"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="font-display text-lg font-semibold tracking-tight">
          DIELESA
          <span className="text-violet-soft">.</span>
        </Link>
        {/* <Link href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <img src="/img/logodielesa.gif" alt="DIELESA" className="h-20 w-auto" />
        </Link> */}

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label="Abrir carrito"
            className="relative rounded-full border border-border/80 bg-white/[0.03] p-2.5 transition-colors hover:border-violet-soft/60 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft"
          >
            <ShoppingBag className="h-4.5 w-4.5" strokeWidth={1.6} />
            {itemCount > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet px-1 font-mono-ui text-[11px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </button>

          <div className="hidden md:block">
            <ShimmerButton onClick={openCart}>Comprar ahora</ShimmerButton>
          </div>

          <button
            className="rounded-full border border-border/80 p-2.5 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border/80 bg-bg/95 px-6 py-4 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-4">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
