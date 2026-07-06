# AETHER Store

Tienda en línea construida con **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS 4** y **Framer Motion**, con un lenguaje visual inspirado en [cult-ui](https://github.com/nolly-studio/cult-ui): botones con borde animado ("shimmer"), tarjetas con spotlight que sigue el cursor, fondos aurora animados y microinteracciones.

## Requisitos

- Node.js 18.18 o superior (recomendado 20+)
- npm (incluido con Node.js)

## Instalación y ejecución local

```bash
# 1. Descomprime el proyecto y entra a la carpeta
cd aether-store

# 2. Instala las dependencias
npm install

# 3. Levanta el servidor de desarrollo
npm run dev
```

Abre http://localhost:3000 en tu navegador.

## Scripts disponibles

- `npm run dev` — servidor de desarrollo con recarga en caliente
- `npm run build` — build de producción
- `npm run start` — sirve el build de producción (ejecuta `npm run build` antes)
- `npm run lint` — revisa el código con ESLint

## Qué incluye

- **Landing / tienda** (`/`): hero con fondo aurora, franja de menciones, sección de valor (bento grid), catálogo con filtro por categoría, testimonios y newsletter.
- **Carrito** persistente en `localStorage`, con panel lateral animado (agregar, quitar, cambiar cantidad).
- **Checkout** (`/checkout`): formulario de envío y resumen de pedido. **Es una demo**: no procesa pagos reales ni guarda tarjetas.
- Componentes reutilizables tipo cult-ui: `ShimmerButton`, tarjetas de producto con spotlight, badges flotantes con órbita.
- Catálogo de 8 productos de ejemplo (audio, wearables, hogar, accesorios) con "renders" generados en CSS (sin depender de imágenes externas).

## Para llevarlo a producción

1. **Pagos**: integra un procesador como Stripe, MercadoPago o Conekta en `src/app/checkout/page.tsx`.
2. **Productos reales**: reemplaza `src/lib/products.ts` por datos desde tu backend/CMS (o conecta un headless commerce como Shopify/Medusa).
3. **Imágenes reales**: sustituye `src/components/product-visual.tsx` por `next/image` apuntando a tus fotografías de producto.
4. **Dominio y despliegue**: el proyecto es compatible con Vercel, Netlify o cualquier hosting que soporte Next.js.

## Estructura

```
src/
  app/
    layout.tsx           # fuentes + metadata + CartProvider
    page.tsx              # landing / tienda
    checkout/page.tsx     # checkout de demostración
    globals.css           # paleta, tipografía, animaciones
  components/              # navbar, hero, cards, drawer, etc.
  context/cart-context.tsx # estado global del carrito
  lib/
    products.ts            # catálogo de ejemplo
    utils.ts                # helpers (cn, formatMXN)
```
