import { Star } from "lucide-react";
import { SectionHeading } from "./section-heading";

const REVIEWS = [
  {
    name: "Camila R.",
    role: "Diseñadora de producto",
    quote:
      "Los Halo TWS cambiaron mis llamadas de trabajo. La cancelación de ruido se siente de otra categoría de precio.",
  },
  {
    name: "Diego M.",
    role: "Corredor de montaña",
    quote:
      "Uso el Pulse Band para entrenar desde hace tres meses y la batería sigue rindiendo como el primer día.",
  },
  {
    name: "Fernanda L.",
    role: "Streamer",
    quote:
      "El Orbit 360 llena mi cuarto de sonido sin distorsión, incluso a volumen alto. Se ve increíble en cámara.",
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
