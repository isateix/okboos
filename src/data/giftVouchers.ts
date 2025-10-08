export type GiftVoucher = {
  id: string;
  value: number;
  theme: string;
  image: string;
  description: string;
};

export const giftVouchers: GiftVoucher[] = [
  {
    id: "gv1",
    value: 5000,
    theme: "Aniversário Feliz",
    image: "/images/Boss.png", // Using an existing image
    description: "Celebre com um presente que eles vão adorar escolher!",
  },
  {
    id: "gv2",
    value: 10000,
    theme: "Agradecimento Especial",
    image: "/images/home.png", // Using an existing image
    description: "Mostre sua gratidão com um vale-presente generoso.",
  },
  {
    id: "gv3",
    value: 25000,
    theme: "Para Todas as Ocasiões",
    image: "/images/entrega.png", // Using an existing image
    description: "A escolha perfeita para qualquer celebração.",
  },
  {
    id: "gv4",
    value: 50000,
    theme: "Luxo e Estilo",
    image: "/images/perfume.webp", // Using an existing image
    description: "Presenteie com o melhor, permitindo a escolha ideal.",
  },
  {
    id: "gv5",
    value: 100000,
    theme: "Sonhos Realizados",
    image: "/images/vestido.png", // Using an existing image
    description: "Transforme desejos em realidade com este vale exclusivo.",
  },
];
