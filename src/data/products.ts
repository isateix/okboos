export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  colors?: string[];
  quantity?: number;
};

export const products: Product[] = [
  { id: "1", name: "A4", price: 1500, image: "/images/a4.jpg" },
  { id: "2", name: "Bone", price: 1500, image: "/images/bone.jpeg" },
  { id: "3", name: "Bone Esportivo", price: 1500, image: "/images/boneesportivos.jpg" },
  { id: "4", name: "Chá", price: 1500, image: "/images/cha.jpg" },
  { id: "5", name: "Chá Verde", price: 1500, image: "/images/cha.png" },
  { id: "6", name: "Chapéu", price: 1500, image: "/images/chapeu.jpeg" },
  { id: "7", name: "Chinela 1", price: 1500, image: "/images/chinela4.webp" },
  { id: "8", name: "Chinela 2", price: 1500, image: "/images/chinelas.jpg" },
  { id: "9", name: "Chinelo", price: 1500, image: "/images/chinelasplasticas.jpeg" },
  { id: "10", name: "Crocs", price: 1500, image: "/images/crocsbranca.jpg" },
  { id: "11", name: "Fitacola 1", price: 1500, image: "/images/fita.jpg" },
  { id: "12", name: "Fitacola 2", price: 1500, image: "/images/fitacola.jpg" },
  { id: "13", name: "Garrafas Plásticas", price: 1500, image: "/images/garafasplasticas.jpeg" },
  { id: "14", name: "Guardanapo", price: 1500, image: "/images/Guardanapo.png" },
  { id: "15", name: "Fitacola 3", price: 1500, image: "/images/cha.png" },
  { id: "16", name: "Fitacola 4", price: 1500, image: "/images/tivelas.jpeg" },
  { id: "17", name: "Terno", price: 1500, image: "/images/terno.png" },
  { id: "18", name: "Vestido", price: 1500, image: "/images/vestido.png" },
  { id: "19", name: "Sapatos Sociais", price: 1500, image: "/images/sapatossocias.png" },
  { id: "20", name: "Panela", price: 1500, image: "/images/panela.jpg" },
];
