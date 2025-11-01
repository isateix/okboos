"use client";

import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import { WishlistProvider } from "../context/WishlistContext";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Páginas onde NÃO queremos mostrar a Navbar
  const hideNavbarOn = ["/", "/login", "/register"];
  const shouldHideNavbar = hideNavbarOn.includes(pathname);

  return (
    <html lang="pt">
      <body className="bg-white text-gray-900">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <UserProvider>
                  {/* Navbar aparece em todas as páginas, exceto as listadas */}
                  {!shouldHideNavbar && <Navbar />}
                  <main className="min-h-screen">{children}</main>
                </UserProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
