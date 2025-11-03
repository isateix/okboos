"use client";

import Navbar from "../components/Navbar";
import Secao20 from "../components/Secao20"; 
import Secao8 from "../components/Secao8";
import Secao9 from "../components/Secao9";
import Secao10 from "../components/Secao10";
import Secao11 from "../components/Secao11";
import Secao12 from "../components/Secao12";
import Secao13 from "../components/Secao13";
import Secao14 from "../components/Secao14";
import Secao15 from "../components/Secao15";
import Secao16 from "../components/Secao16";
import Secao17 from "../components/Secao17";
import Secao18 from "../components/Secao18";
import Secao19 from "../components/Secao19";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
<main className="space-y-10 sm:space-y-12 md:space-y-14">
        <Secao20 />
        <Secao8 />
        <Secao9 />
        <Secao10 />
        <Secao11 />
        <Secao12 />
        <Secao13 />
        <Secao14 />
        <Secao15 />
        <Secao16 />
        <Secao17 />
        <Secao18 />
        <Secao19 />
      </main>

      {/* Barra inferior fixa no mobile */}
      <BottomNav />

      {/* Footer aparece apenas no desktop */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
