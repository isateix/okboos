// src/app/layout.tsx
// import { ClerkProvider } from "@clerk/nextjs";
// import { ptBR } from "@clerk/localizations";
import Navbar from "../components/Navbar";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext"; // 🔹 importar WishlistProvider
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OkBoss",
  description: "OkBoss site da Empresa OkBoss",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 🔹 ClerkProvider comentado temporariamente
    // <ClerkProvider
    //   publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    //   localization={ptBR}
    // >
      <AuthProvider>
        <UserProvider>
          <CartProvider>
            <WishlistProvider> {/* 🔹 Adicionado para corrigir useWishlist */}
              <html lang="pt">
                <body className="antialiased bg-white text-gray-900">
                  <Navbar />
                  <main className="min-h-screen pt-24">{children}</main>
                </body>
              </html>
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
      </AuthProvider>
    // </ClerkProvider>
  );
}
