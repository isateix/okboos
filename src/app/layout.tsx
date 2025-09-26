import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../context/CartContext";

export const metadata = {
  title: "ShopConnect",
  description: "Aplicação de e-commerce em Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <body className="bg-gray-100">
        <CartProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
