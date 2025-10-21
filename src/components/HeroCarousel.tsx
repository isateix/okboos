'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Carousel, CarouselItem } from "../components/ui/carousel";

const slides = [
  {
    id: 1,
    title: "ROLLOS DE TPA E DE FACTURAÇÃO",
    description: "Compre agora e receba na sua porta!",
    extra: "Entrega grátis garantida!",
    bg: "#7a2a9e",
    images: ["/images/rolos-de-papel.jpg"],
    icon: "/images/556.png",
  },
  {
    id: 2,
    title: "FITAS ADESIVAS",
    description: "Todos os tamanhos disponíveis",
    extra: "Frete grátis em todos os pedidos!",
    bg: "#ff7f50",
    images: ["/images/fitapp.jpg"],
    icon: "/images/556.png",
  },
  {
    id: 3,
    title: "TIJELAS PLÁSTICAS",
    description: "Com tampas retangulares e redondas",
    extra: "Frete grátis + descontos exclusivos!",
    bg: "#2E7D32",
    images: ["/images/tijelas.jpg"],
    icon: "/images/556.png",
  },
  {
    id: 4,
    title: "CROCS COLORIDOS",
    description: "Conforto e estilo em todas as cores",
    extra: "Descontos até 50% + entrega grátis!",
    bg: "#F48FB1",
    images: ["/images/crocs.jpg"],
    icon: "/images/556.png",
  },
];

export default function HeroCarousel() {
  const router = useRouter();

  return (
    <section className="relative w-full pt-[90px] h-[480px] md:h-[450px] overflow-hidden">
      <Carousel autoPlay interval={6000}>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div
              className="relative w-full h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-12"
              style={{ backgroundColor: slide.bg }}
            >
              {/* TEXTO */}
              <div className="max-w-[90%] md:max-w-[45%] text-white z-20">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-2">{slide.title}</h2>
                <p className="text-lg md:text-xl mb-3">{slide.description}</p>
                <p className="text-base italic mb-4">{slide.extra}</p>

                <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full w-fit shadow-lg mb-4">
                  <Image src={slide.icon} alt="Frete Grátis" width={28} height={28} />
                  <span className="text-white font-bold">ENTREGA GRÁTIS</span>
                </div>

                <button
                  onClick={() => router.push("/shop")}
                  className="bg-white text-black font-bold px-5 py-2 rounded-full hover:bg-gray-200 transition"
                >
                  COMPRAR AGORA
                </button>
              </div>

              {/* IMAGEM */}
              <div className="relative flex justify-center items-center md:w-[50%] h-[300px]">
                <Image
                  src={slide.images[0]}
                  alt={slide.title}
                  width={500}
                  height={400}
                  className="object-contain rounded-xl shadow-xl"
                  priority
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </section>
  );
}
