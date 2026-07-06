import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustMarquee } from "@/components/trust-marquee";
import { FeatureBento } from "@/components/feature-bento";
import { ProductGrid } from "@/components/product-grid";
import { Testimonials } from "@/components/testimonials";
import { NewsletterCta } from "@/components/newsletter-cta";
import { Footer } from "@/components/footer";
import { CartDrawer } from "@/components/cart-drawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustMarquee />
        <FeatureBento />
        <ProductGrid />
        <Testimonials />
        <NewsletterCta />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
