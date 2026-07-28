import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

const REVIEWS = [
  {
    name: "Carlos R.",
    role: "Contratista Eléctrico",
    quote:
      "Los tableros y disyuntores que compré aquí son de primera calidad. La seguridad eléctrica no se negocia y sus productos cumplen todas las normas.",
  },
  {
    name: "Miguel S.",
    role: "Maestro de Obra",
    quote:
      "Llevo meses usando el taladro percutor inalámbrico en obra pesada y la potencia es constante. La mejor inversión para mi caja de herramientas.",
  },
  {
    name: "Lucía P.",
    role: "Aficionada al DIY",
    quote:
      "Encontré todo el kit de iluminación LED para renovar mi casa. El asesoramiento técnico me ayudó a elegir los cables correctos y ahorrar energía.",
  },
];

export function Testimonials() {
  return (
    <section id="opiniones" className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <SectionHeading
        eyebrow="Clientes"
        title="Gente real, resultados reales"
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="rounded-3xl border border-border/80 bg-surface p-8 transition-colors duration-300 hover:border-violet-soft/40"
          >
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber text-amber" />
              ))}
            </div>
            <blockquote className="mt-5 text-sm leading-relaxed text-ink/90">
              “{review.quote}”
            </blockquote>
            <figcaption className="mt-6 text-sm">
              <span className="font-medium text-ink">{review.name}</span>
              <span className="text-muted"> — {review.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
