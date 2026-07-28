import { Zap, Wrench, Cog, Clock, Phone, Mail, Navigation } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FacebookIcon, InstagramIcon, WhatsappIcon, TiktokIcon } from "./social-icons";

const SOCIALS = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "WhatsApp", icon: WhatsappIcon, href: "#" },
  { name: "TikTok", icon: TiktokIcon, href: "#" },
];

// 🔧 Cambia esta dirección por la real para que el mapa apunte al lugar correcto
const DIRECCION = "Av. Camino a Santiago, Col. Progreso, Ciudad de México";
const MAPS_EMBED_URL = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15042.379279497158!2d-99.155968!3d19.5160605!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1f82101459a21%3A0xd53e95c0908dc33c!2sEl%C3%A9ctrica%20Dielesa!5e0!3m2!1ses-419!2smx!4v1785166496863!5m2!1ses-419!2smx`;
const MAPS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(DIRECCION)}`;

export function FeatureBento() {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <SectionHeading
        eyebrow="Quiénes somos"
        title="38 años surtiendo material eléctrico, ferretero y de automatización"
        description="DIELESA nació como un local familiar en la Ciudad de México y hoy es punto de referencia para instaladores, contratistas y empresas que buscan calidad y respaldo real, no solo precio."
      />

      {/* Cards principales */}
      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Qué vendemos */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8">
          <div className="flex gap-2">
            <Zap className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
            <Wrench className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
            <Cog className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
          </div>
          <h3 className="mt-5 font-display text-lg font-medium">
            Eléctrico · Ferretero · Automatización
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Todo lo que necesitas en un solo lugar. Desde herramientas y materiales
            eléctricos hasta soluciones de automatización para tu hogar o negocio.
          </p>
        </div>

        {/* Redes sociales */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8">
          <h3 className="font-display text-lg font-medium">Síguenos en redes</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Ofertas, novedades y tips de instalación todos los días.
          </p>
          <div className="mt-5 flex gap-3">
            {SOCIALS.map(({ name, icon: Icon, href }) => (
              <a
                key={name}
                href={href}
                aria-label={name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border/80 bg-white/[0.03] text-muted transition-colors duration-200 hover:border-violet-soft/60 hover:text-ink"
              >
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Sección Mapa + Info de contacto */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5">
          {/* Mapa */}
          <div className="relative h-[320px] w-full lg:col-span-3 lg:h-[420px]">
            <iframe
              title="Ubicación DIELESA"
              src={MAPS_EMBED_URL}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          {/* Info de contacto */}
          <div className="flex flex-col justify-center gap-6 p-8 lg:col-span-2 lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange-500">
                Encuéntranos en
              </p>
              <h3 className="mt-2 font-display text-2xl font-semibold text-ink lg:text-3xl">
                Av. Camino a Santiago
              </h3>
              <p className="mt-1 text-sm text-muted">
                Col. Progreso, Ciudad de México
              </p>
            </div>

            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" strokeWidth={1.8} />
                <span>
                  <span className="font-medium text-ink">Horario:</span> Lun – Vie 9:00 – 18:00 · Sáb 9:00 – 13:00
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" strokeWidth={1.8} />
                <span>
                  <span className="font-medium text-ink">Teléfono:</span> (55) 680 583 80
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" strokeWidth={1.8} />
                <span>
                  <span className="font-medium text-ink">Email:</span> marketing@dielesa.com.mx
                </span>
              </li>
            </ul>

            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-lg shadow-orange-900/30 transition-all hover:bg-orange-600 hover:shadow-xl"
            >
              <Navigation className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              Cómo llegar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}