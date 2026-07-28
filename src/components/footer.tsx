import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { FacebookIcon, InstagramIcon, WhatsappIcon, TiktokIcon } from "./social-icons";

const COLUMNS = [
  {
    title: "Productos",
    links: [
      { label: "Material eléctrico", href: "#catalogo" },
      { label: "Ferretería", href: "#catalogo" },
      { label: "Automatización", href: "#catalogo" },
      { label: "Herramientas", href: "#catalogo" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Nosotros", href: "#nosotros" },
      { label: "Catálogo 2026", href: "#catalogo" },
      { label: "Clientes", href: "#clientes" },
      { label: "Trabaja con nosotros", href: "#" },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Cotizaciones", href: "#" },
      { label: "Envíos a obra", href: "#" },
      { label: "Garantías", href: "#" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

const SOCIALS = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "WhatsApp", icon: WhatsappIcon, href: "#" },
  { name: "TikTok", icon: TiktokIcon, href: "#" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white">
      {/* Decoración de fondo */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-orange-400/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-orange-800/40 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        {/* Bloque superior: logo + info + columnas */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Marca + descripción + contacto */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block">
              <span className="font-display text-3xl font-bold tracking-tight text-white">
                DIELESA
                <span className="text-orange-200">.</span>
              </span>
            </Link>
            {/* Info de contacto rápida */}
            <ul className="mt-6 space-y-3 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-orange-100" strokeWidth={2} />
                <span>Av. Camino a Santiago, Col. Progreso, CDMX</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-100" strokeWidth={2} />
                <a href="tel:+525512345678" className="hover:text-white hover:underline">
                  (55) 690 58380
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-100" strokeWidth={2} />
                <a href="mailto:contacto@dielesa.com" className="hover:text-white hover:underline">
                  marketing@dielesa.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-100" strokeWidth={2} />
                <span>Lun – Vie 9:00 – 18:00 · Sáb 9:00 – 13:00</span>
              </li>
            </ul>
          </div>

          {/* Columnas de enlaces */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="font-mono-ui text-xs font-semibold uppercase tracking-[0.15em] text-orange-100">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-white/85 transition-colors hover:text-white hover:underline underline-offset-4"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Redes sociales
        <div className="mt-12 flex flex-col items-start gap-4 border-t border-white/20 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Síguenos en redes</p>
            <p className="mt-1 text-xs text-white/75">
              Ofertas, novedades y tips de instalación.
            </p>
          </div>
          <div className="flex gap-3">
            {SOCIALS.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all hover:scale-110 hover:border-white hover:bg-white hover:text-orange-600"
              >
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </a>
            ))}
          </div>
        </div> */}

        {/* Barra inferior legal */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/20 pt-6 text-xs text-white/75 sm:flex-row">
          <p>
            © {new Date().getFullYear()} <span className="font-semibold text-white">DIELESA</span>. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-white">Aviso de privacidad</a>
            <a href="#" className="transition-colors hover:text-white">Términos y condiciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}