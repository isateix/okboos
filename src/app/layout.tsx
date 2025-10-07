import "./globals.css";
import { CartProvider } from "../context/CartContext";
import { LanguageProvider } from "../context/LanguageContext";
import { Rufina } from "next/font/google";
import ClientLayout from "./client-layout"; // componente cliente

const rufina = Rufina({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-rufina",
});

export const metadata = {
  title: "ShopConnect",
  description: "Aplicação de e-commerce em Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className={`${rufina.className} bg-[#f6eee9] text-gray-900`}>
        <LanguageProvider>
          <CartProvider>
            <ClientLayout>{children}</ClientLayout>
          </CartProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
