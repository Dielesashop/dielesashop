import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { FeatureBento } from "@/components/feature-bento";
import { ProductGrid } from "@/components/product-grid";
import { Testimonials } from "@/components/testimonials";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Footer } from "@/components/footer";
import type { ComponentType } from "react";
import { CartDrawer } from "@/components/cart-drawer";
import { getProducts } from "@/lib/supabase/products";
import { WhatsAppButton } from "@/components/whatsup-botton";
import { ProductRequestForm } from "@/components/product-requestfrom";



// Vuelve a pedir los productos a Supabase cada 60s como máximo (ISR).
export const revalidate = 60;

export default async function Home() {
  const products = await getProducts();
  const featured = products[0];
  const HeroWithFeatured = Hero as ComponentType<{ featured: typeof featured }>;

  return (
    <>
      <Navbar />
      <main>
        <div className="bg-slate-100 text-slate-900 antialiased">
          <WhatsAppButton />
        </div>
        <HeroWithFeatured featured={featured} />
        <TrustMarquee />
        <FeatureBento />
        <ProductGrid products={products} />
        {/* <Testimonials /> */}
        <ProductRequestForm />
        {/* <NewsletterCta /> */}
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
