"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { CartProvider } from "../context/CartContext";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNavbar = pathname === "/quem-somos" || pathname === "/contacto";

  return (
    <CartProvider>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
      <Footer />
      <AuthModal />
    </CartProvider>
  );
}
