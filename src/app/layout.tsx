// src/app/layout.tsx
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { CartProvider } from "../context/CartContext";
import { UserProvider } from "../context/UserContext";
import { AuthProvider } from "../context/AuthContext";
import Header from "../components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="bg-white text-gray-900">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              <UserProvider>
                <Header />
                <main className="min-h-screen">{children}</main>
              </UserProvider>
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
