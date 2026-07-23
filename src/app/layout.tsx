import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { AuthProvider } from "@/context/auth-context";
import { getProducts } from "@/lib/supabase/products";

export const metadata: Metadata = {
  title: "Dielesa - productos de ferretería, material eléctrico y automatización industrial",
  description:
    "Dielesa - productos de ferretería, material eléctrico y automatización industrial. Envío a todo México. Compra en línea y recibe en tu obra o negocio.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();

  return (
    <html lang="es" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <CartProvider products={products}>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}