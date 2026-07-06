export type ProductVisual = {
  icon:
    | "headphones"
    | "watch"
    | "speaker"
    | "glasses"
    | "mouse"
    | "keyboard"
    | "lamp"
    | "camera";
  from: string;
  via: string;
  to: string;
};

export type Product = {
  id: string;
  name: string;
  category: "audio" | "wearables" | "hogar" | "accesorios";
  tagline: string;
  description: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  stock: number;
  badge?: "Nuevo" | "Más vendido" | "Edición limitada";
  visual: ProductVisual;
};

export const products: Product[] = [
  {
    id: "halo-tws",
    name: "Halo TWS",
    category: "audio",
    tagline: "Cancelación de ruido adaptativa",
    description:
      "Audífonos in-ear con cancelación de ruido adaptativa, audio espacial y 32 horas de batería con estuche.",
    price: 2899,
    compareAt: 3499,
    rating: 4.8,
    reviews: 612,
    stock: 34,
    badge: "Más vendido",
    visual: { icon: "headphones", from: "#7f5af0", via: "#4c2f9e", to: "#0b0b12" },
  },
  {
    id: "pulse-band",
    name: "Pulse Band",
    category: "wearables",
    tagline: "Salud y sueño en tiempo real",
    description:
      "Banda de actividad ultraligera con sensor de oxígeno, seguimiento de sueño y pantalla AMOLED siempre visible.",
    price: 2199,
    rating: 4.6,
    reviews: 348,
    stock: 51,
    badge: "Nuevo",
    visual: { icon: "watch", from: "#2cb67d", via: "#1c7a53", to: "#0b0b12" },
  },
  {
    id: "orbit-speaker",
    name: "Orbit 360",
    category: "audio",
    tagline: "Sonido envolvente de mesa",
    description:
      "Bocina de 360° con graves de doble radiador, resistencia IP67 y hasta 20 horas de reproducción continua.",
    price: 1799,
    rating: 4.7,
    reviews: 205,
    stock: 40,
    visual: { icon: "speaker", from: "#ffb454", via: "#c97a1f", to: "#0b0b12" },
  },
  {
    id: "vision-frame",
    name: "Vision Frame",
    category: "wearables",
    tagline: "Notificaciones sin pantalla",
    description:
      "Lentes con audio de conducción ósea y micrófonos direccionales para llamadas y notificaciones discretas.",
    price: 3299,
    compareAt: 3899,
    rating: 4.4,
    reviews: 96,
    stock: 18,
    badge: "Edición limitada",
    visual: { icon: "glasses", from: "#b6a4ff", via: "#7f5af0", to: "#0b0b12" },
  },
  {
    id: "drift-mouse",
    name: "Drift Air",
    category: "accesorios",
    tagline: "Precisión de 26,000 DPI",
    description:
      "Mouse inalámbrico ultraligero de 54g con sensor óptico de 26,000 DPI y hasta 70 días de batería.",
    price: 1299,
    rating: 4.9,
    reviews: 780,
    stock: 65,
    visual: { icon: "mouse", from: "#7bffc0", via: "#2cb67d", to: "#0b0b12" },
  },
  {
    id: "typecraft",
    name: "Typecraft 87",
    category: "accesorios",
    tagline: "Mecánico, silencioso, ágil",
    description:
      "Teclado mecánico de 87 teclas con switches lubricados de fábrica, cuerpo en aluminio y conexión tri-modo.",
    price: 2599,
    rating: 4.7,
    reviews: 421,
    stock: 22,
    visual: { icon: "keyboard", from: "#ff9f7f", via: "#c9553a", to: "#0b0b12" },
  },
  {
    id: "glow-lamp",
    name: "Glow Prism",
    category: "hogar",
    tagline: "Luz adaptativa para tu espacio",
    description:
      "Lámpara modular con 16 millones de colores, sincronización con música y control por voz o app.",
    price: 1599,
    rating: 4.5,
    reviews: 158,
    stock: 47,
    badge: "Nuevo",
    visual: { icon: "lamp", from: "#ffe27a", via: "#ffb454", to: "#0b0b12" },
  },
  {
    id: "aperture-cam",
    name: "Aperture Mini",
    category: "hogar",
    tagline: "Seguridad discreta en 2K",
    description:
      "Cámara de seguridad 2K con visión nocturna a color, detección de personas por IA y almacenamiento local.",
    price: 1899,
    rating: 4.3,
    reviews: 132,
    stock: 29,
    visual: { icon: "camera", from: "#8fb8ff", via: "#4c7fd6", to: "#0b0b12" },
  },
];

export const categories: { key: Product["category"] | "todos"; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "audio", label: "Audio" },
  { key: "wearables", label: "Wearables" },
  { key: "hogar", label: "Hogar" },
  { key: "accesorios", label: "Accesorios" },
];
