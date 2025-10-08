export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  colors?: string[];
  quantity?: number;
  category?: string;
};

export const products: Product[] = [
  { id: "1", name: "A4", price: 1500, image: "/images/a4.jpg", category: "Ofertas do Dia" },
  { id: "2", name: "Bone", price: 1500, image: "/images/bone.jpeg", category: "Mais Avaliados" },
  { id: "3", name: "Bone Esportivo", price: 1500, image: "/images/boneesportivos.jpg", category: "Mais Avaliados" },
  { id: "4", name: "Chá", price: 1500, image: "/images/cha.jpg", category: "Ofertas do Dia" },
  { id: "5", name: "Chá Verde", price: 1500, image: "/images/cha.png", category: "Ofertas do Dia" },
  { id: "6", name: "Chapéu", price: 1500, image: "/images/chapeu.jpeg", category: "Mais Avaliados" },
  { id: "7", name: "Chinela 1", price: 1500, image: "/images/chinela4.webp", category: "Dia das Crianças" },
  { id: "8", name: "Chinela 2", price: 1500, image: "/images/chinelas.jpg", category: "Dia das Crianças" },
  { id: "9", name: "Chinelo", price: 1500, image: "/images/chinelasplasticas.jpeg", category: "Dia das Crianças" },
  { id: "10", name: "Crocs", price: 1500, image: "/images/crocsbranca.jpg", category: "Dia das Crianças" },
  { id: "11", name: "Fitacola 1", price: 1500, image: "/images/fita.jpg", category: "Ofertas do Dia" },
  { id: "12", name: "Fitacola 2", price: 1500, image: "/images/fitacola.jpg", category: "Ofertas do Dia" },
  { id: "13", name: "Garrafas Plásticas", price: 1500, image: "/images/garafasplasticas.jpeg", category: "Mais Vantagens" },
  { id: "14", name: "Guardanapo", price: 1500, image: "/images/Guardanapo.png", category: "Mais Vantagens" },
  { id: "15", name: "Fitacola 3", price: 1500, image: "/images/cha.png", category: "Ofertas do Dia" },
  { id: "16", name: "Fitacola 4", price: 1500, image: "/images/tivelas.jpeg", category: "Ofertas do Dia" },
  { id: "17", name: "Terno", price: 1500, image: "/images/terno.png", category: "Mais Avaliados" },
  { id: "18", name: "Vestido", price: 1500, image: "/images/vestido.png", category: "Mais Avaliados" },
  { id: "19", name: "Sapatos Sociais", price: 1500, image: "/images/sapatossocias.png", category: "Mais Avaliados" },
  { id: "20", name: "Panela", price: 1500, image: "/images/panela.jpg", category: "Echo e Fire TV" },
  { id: "21", name: "TV", price: 55000, image: "/images/tve.png", category: "Echo e Fire TV" },
  { id: "22", name: "Arca", price: 120000, image: "/images/arca.png", category: "Echo e Fire TV" },
  { id: "23", name: "Jogos de Sofás", price: 250000, image: "/images/jogaoafas.png", category: "Echo e Fire TV" },
  { id: "24", name: "Geleira", price: 150000, image: "/images/gelerira.png", category: "Echo e Fire TV" },
  { id: "25", name: "Ténis Esportivo", price: 5000, image: "/images/tenisesporte.png", category: "Mais Avaliados" },
  { id: "26", name: "Agenda", price: 1000, image: "/images/agenda.png", category: "Faça Login" },
  { id: "27", name: "Cartucho", price: 2500, image: "/images/cartucho.png", category: "Faça Login" },
  { id: "28", name: "Bloco de Notas", price: 500, image: "/images/blocodenotas.png", category: "Faça Login" },
  { id: "29", name: "Cadeira de Rodas", price: 35000, image: "/images/cadeira_de_roda-removebg-preview.png", category: "Faça Login" },
  { id: "30", name: "Caixa de Madeira", price: 3000, image: "/images/caixamadeira.png", category: "Dia das Crianças" },
  { id: "31", name: "Colete", price: 2000, image: "/images/colete.png", category: "Dia das Crianças" },
  { id: "32", name: "Microondas", price: 45000, image: "/images/microonda.png", category: "Mais Vantagens" },
  { id: "33", name: "Respirador", price: 1500, image: "/images/respirador.png", category: "Echo e Fire TV" },
  { id: "34", name: "Perfume", price: 5000, image: "/images/perfume.webp", category: "Echo e Fire TV" },
  { id: "35", name: "Sandália", price: 2500, image: "/images/sandalia1.jpg", category: "Ganhe Benefícios" },
  { id: "36", name: "Taça", price: 1000, image: "/images/taça.png", category: "Ganhe Benefícios" },
  { id: "37", name: "Fivelas", price: 500, image: "/images/tivelas.jpeg", category: "Ganhe Benefícios" },
  { id: "38", name: "Vestido de Festa", price: 15000, image: "/images/vestido.png", category: "Ganhe Benefícios" }
];
