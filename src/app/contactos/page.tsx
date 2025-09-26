"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaWhatsapp, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Contactos() {
  return (
    <>
      <Navbar />
      <main className="pt-24 px-6 md:px-16">
        <h2 className="text-3xl font-bold mb-4">Contacte-nos</h2>

        <p className="mb-2">Endereço: Shopping Leon Spark, via Estrada</p>
        <p className="mb-2">Telefone: 947965623</p>
        <p className="mb-2">WhatsApp: 947965623</p>
        <p className="mb-2">Email: isateix1996@gmail.com</p>
        <p className="mb-2">IBAN: 004000001164591510107</p>

        <h3 className="text-2xl font-semibold mt-6 mb-2">Redes Sociais</h3>
        <div className="flex gap-4 text-blue-700 mb-6">
          <a href="https://wa.me/244947965623" target="_blank" rel="noreferrer">
            <FaWhatsapp size={28} className="hover:text-green-500" />
          </a>
          <a href="https://www.instagram.com/seu_perfil" target="_blank" rel="noreferrer">
            <FaInstagram size={28} className="hover:text-pink-500" />
          </a>
          <a href="https://www.facebook.com/seu_perfil" target="_blank" rel="noreferrer">
            <FaFacebook size={28} className="hover:text-blue-700" />
          </a>
          <a href="https://www.linkedin.com/in/seu_perfil" target="_blank" rel="noreferrer">
            <FaLinkedin size={28} className="hover:text-blue-600" />
          </a>
        </div>

        <h3 className="text-2xl font-semibold mt-6 mb-2">Chat</h3>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-6">
          Abrir Chat
        </button>
      </main>
      <Footer />
    </>
  );
}
