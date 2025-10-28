import { FaStar, FaGift, FaBolt } from "react-icons/fa";

export default function FeaturedBanner() {
  const bannerOptions = [
    { title: "Melhores Classificados", icon: FaStar, href: "/melhores-classificados" },
    { title: "Novidades", icon: FaGift, href: "/novidades" },
    { title: "Melhores Ofertas", icon: FaBolt, href: "/melhores-ofertas" },
  ];

  return (
    <div className="w-full h-[50vh] relative flex flex-col md:flex-row items-center justify-center overflow-hidden">
      
      {/* Fundo opcional semi-transparente */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Botões sobrepostos */}
      <div className="relative z-10 flex flex-col md:flex-row gap-8">
        {bannerOptions.map((opt) => {
          const Icon = opt.icon;
          return (
            <a
              key={opt.title}
              href={opt.href}
              className="flex flex-col items-center justify-center px-6 py-4 bg-white/80 rounded-lg shadow-md hover:bg-[#ff5000] hover:text-white transition text-center"
            >
              <Icon size={32} className="mb-2" />
              <span className="font-semibold text-lg">{opt.title}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
