import { Zap, Wrench, Cog, MapPin, Clock } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { FacebookIcon, InstagramIcon, WhatsappIcon, TiktokIcon } from "./social-icons";

const SOCIALS = [
  { name: "Facebook", icon: FacebookIcon, href: "#" },
  { name: "Instagram", icon: InstagramIcon, href: "#" },
  { name: "WhatsApp", icon: WhatsappIcon, href: "#" },
  { name: "TikTok", icon: TiktokIcon, href: "#" },
];

export function FeatureBento() {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <SectionHeading
        eyebrow="Quiénes somos"
        title="38 años surtiendo material eléctrico, ferretero y de automatización"
        description="DIELESA nació como un local familiar en la Ciudad de México y hoy es punto de referencia para instaladores, contratistas y empresas que buscan calidad y respaldo real, no solo precio."
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {/* Historia — tarjeta grande */}
        {/* <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-violet/15 via-surface to-surface p-8 md:col-span-2 lg:col-span-2 lg:row-span-2">
          <Zap className="h-8 w-8 text-violet-soft" strokeWidth={1.4} />
          <h3 className="mt-6 font-display text-2xl font-medium">
            38 años de experiencia.
          </h3>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
            Desde hace 38 años surtimos material eléctrico, ferretero y soluciones
            de automatización para hogares, talleres e industria. Hemos crecido
            junto con nuestros clientes, adaptándonos a cada nueva tecnología sin
            perder el trato cercano que nos distingue desde el primer día.
          </p>
          <div
            className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-violet/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
            aria-hidden
          />
        </div> */}

        {/* Qué vendemos */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8">
          <div className="flex gap-2">
            <Zap className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
            <Wrench className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
            <Cog className="h-6 w-6 text-mint-soft" strokeWidth={1.4} />
          </div>
          <h3 className="mt-5 font-display text-lg font-medium">Eléctrico · Ferretero · Automatización</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Todo lo que necesitas en un solo lugar. Desde herramientas y materiales eléctricos hasta soluciones de automatización para tu hogar o negocio.
          </p>
        </div>

        {/* Ubicación */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8">
          <MapPin className="h-7 w-7 text-amber" strokeWidth={1.4} />
          <h3 className="mt-5 font-display text-lg font-medium">Visítanos</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Av. Camino a Santiago, Col. Progreso,
            <br />
            Ciudad de México
          </p>
        </div>

        {/* Horario */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8">
          <Clock className="h-7 w-7 text-violet-soft" strokeWidth={1.4} />
          <h3 className="mt-5 font-display text-lg font-medium">Horario de atención</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Lunes a viernes: 9:00 – 18:00
            <br />
            Sábado: 9:00 – 13:00
          </p>
        </div>

        {/* Redes sociales */}
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-surface p-8 md:col-span-2 lg:col-span-2">
          <h3 className="font-display text-lg font-medium">Síguenos en redes</h3>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
            Ofertas, novedades y tips de instalación todos los días.
          </p>
          <div className="mt-5 flex gap-3">
            { SOCIALS.map(({ name, icon: Icon, href }) => (
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
    </section>
  );
}