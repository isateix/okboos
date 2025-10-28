"use client";

import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // 🔸 Define as páginas onde o Header NÃO deve aparecer (LandingPage, Login, etc.)
  const hideHeaderOn = ["/", "/login", "/register"];
  const shouldHideHeader = hideHeaderOn.includes(pathname);

  return (
    <html lang="pt">
      <body className="bg-white text-gray-900">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <UserProvider>
                {/* Renderiza Header apenas se não for a LandingPage */}
                {!shouldHideHeader && <Header />}

                <main className="min-h-screen">{children}</main>
              </UserProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
