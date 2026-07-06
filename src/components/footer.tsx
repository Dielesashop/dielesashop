import Link from "next/link";

const COLUMNS = [
  {
    title: "Productos",
    links: ["Audio", "Wearables", "Hogar", "Accesorios"],
  },
  {
    title: "Compañía",
    links: ["Nosotros", "Sostenibilidad", "Prensa", "Trabaja con nosotros"],
  },
  {
    title: "Ayuda",
    links: ["Rastrear pedido", "Devoluciones", "Garantía", "Contacto"],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/80 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="font-display text-lg font-semibold">
              AETHER<span className="text-violet-soft">.</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              Objetos inteligentes diseñados en México para el resto del mundo.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="font-mono-ui text-xs uppercase tracking-[0.15em] text-muted">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted transition-colors hover:text-ink">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border/80 pt-8 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} AETHER Store. Proyecto de demostración.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-ink">Privacidad</a>
            <a href="#" className="hover:text-ink">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
