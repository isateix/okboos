

import { ClerkProvider } from "@clerk/nextjs";
import { ptBR } from "@clerk/localizations";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext"; 
import { LanguageProvider } from "../context/LanguageContext";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OkBoss",
  description: "OkBoss site da Empresa OkBoss",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      localization={ptBR}
    >
      <LanguageProvider>
            <CartProvider>
              <WishlistProvider>
                <html lang="pt">
                  <body className="antialiased bg-white text-gray-900">
                    <Navbar />
                    <main className="min-h-screen pt-24">{children}</main>
                  </body>
                </html>
              </WishlistProvider>
            </CartProvider>
      </LanguageProvider>
    </ClerkProvider>
  );
}
