import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import clsx from "clsx";
import { ptBR } from "@clerk/localizations";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OkBoss",
  description: "OkBoss site da Empresa OkBoss",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      localization={ptBR}
    >
      <html lang="pt">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        >
          {/* Navbar fixa no topo */}
          <Navbar />

          {/* Conteúdo da página */}
          <main className="min-h-screen pt-24">{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
