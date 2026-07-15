"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Menu, ShoppingBag, User, X } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { cn } from "@/lib/utils";
import { ShimmerButton } from "./shimmer-button";


const LINKS = [
  { href: "/#catalogo", label: "Catalogo" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#opiniones", label: "Opiniones" },
];

export function Navbar() {
  const { itemCount, openCart } = useCart();
  const { user, isAuthenticated, hydrated, logout } = useAuth();
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
          AETHER
          <span className="text-violet-soft">.</span>
        </Link>

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
          {/* Login / cuenta */}
          {hydrated && (
            isAuthenticated ? (
              <div className="hidden items-center gap-2 md:flex">
                <span className="flex items-center gap-2 rounded-full border border-violet-soft/30 bg-violet/10 px-3 py-1.5 text-sm text-ink">
                  <User className="h-4 w-4 text-violet-soft" />
                  {user?.email?.split("@")[0]}
                </span>
                <button
                  onClick={logout}
                  aria-label="Cerrar sesión"
                  className="rounded-full border border-border/80 p-2.5 text-muted transition-colors hover:border-violet-soft/60 hover:text-ink"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-2 rounded-full border border-border/80 bg-white/[0.03] px-4 py-2 text-sm text-muted transition-colors hover:border-violet-soft/60 hover:text-ink md:flex"
              >
                <User className="h-4 w-4" />
                Iniciar sesión
              </Link>
            )
          )}

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

            {hydrated && (
              isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-2 text-sm text-muted hover:text-ink"
                >
                  <LogOut className="h-4 w-4" />
                  Cerrar sesión ({user?.email?.split("@")[0]})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 text-sm text-muted hover:text-ink"
                >
                  <User className="h-4 w-4" />
                  Iniciar sesión
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
