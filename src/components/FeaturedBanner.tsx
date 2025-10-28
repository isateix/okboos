import { FaStar, FaGift, FaBolt } from "react-icons/fa";

export default function FeaturedBanner() {
  const bannerOptions = [
    {
      title: "Melhores Classificados",
      href: "/melhores-classificados",
      icon: <FaStar size={24} className="mr-2" />,
    },
    {
      title: "Novidades",
      href: "/novidades",
      icon: <FaGift size={24} className="mr-2" />,
    },
    {
      title: "Melhores Ofertas",
      href: "/melhores-ofertas",
      icon: <FaBolt size={24} className="mr-2" />,
    },
  ];

  return (
    <div className="w-full h-[50vh] relative flex items-center justify-center bg-gray-100 overflow-hidden">
      
      {/* Overlay semi-transparente */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>

      {/* Botões sobrepostos */}
      <div className="relative z-10 flex flex-col md:flex-row gap-4">
        {bannerOptions.map((opt) => (
          <a
            key={opt.title}
            href={opt.href}
            className="flex items-center justify-center px-6 py-3 bg-white/90 text-gray-800 font-semibold rounded-md hover:bg-[#ff5000] hover:text-white transition"
          >
            {opt.icon}
            {opt.title}
          </a>
        ))}
      </div>
    </div>
  );
}
