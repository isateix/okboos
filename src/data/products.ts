export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  colors?: string[];
  quantity?: number;
  category?: string;
  originalPrice?: number;
  discountPercentage?: number;
};

export const products: Product[] = [
  // Ofertas do Dia
  { id: "1", name: "A4", price: 1000, originalPrice: 1500, discountPercentage: 33, image: "/images/a4.jpg", category: "Ofertas do Dia", description: "Resma de papel A4 de alta qualidade, ideal para impressões diárias, documentos importantes e uso escolar. Com 500 folhas, garante excelente desempenho em todas as impressoras." },
  { id: "4", name: "Chá", price: 1200, originalPrice: 1500, discountPercentage: 20, image: "/images/cha.jpg", category: "Ofertas do Dia", description: "Chá preto de sabor intenso e aroma marcante. Perfeito para começar o dia com energia ou para um momento relaxante à tarde." },
  { id: "5", name: "Chá Verde", price: 1500, image: "/images/cha.png", category: "Ofertas do Dia", description: "Chá verde orgânico, conhecido por suas propriedades antioxidantes e sabor suave. Uma bebida saudável e revigorante para qualquer hora." },
  { id: "11", name: "Fitacola 1", price: 1000, originalPrice: 1500, discountPercentage: 33, image: "/images/fita.jpg", category: "Ofertas do Dia", description: "Fita adesiva transparente de alta aderência, essencial para escritório, escola e casa. Forte e durável para todas as suas necessidades de fixação." },
  { id: "15", name: "Fitacola 3", price: 1500, image: "/images/cha.png", category: "Ofertas do Dia", description: "Fita adesiva extra forte para trabalhos pesados. Ideal para fixar objetos, selar caixas e reparos que exigem maior resistência." },
  { id: "16", name: "Fitacola 4", price: 1500, image: "/images/tivelas.jpeg", category: "Ofertas do Dia", description: "Fita adesiva decorativa com padrões exclusivos. Perfeita para artesanato, scrapbooking e personalização de objetos." },
  { id: "97", name: "Bateria de Carro", price: 20000, originalPrice: 25000, discountPercentage: 20, image: "/images/3.png", category: "Ofertas do Dia", description: "Bateria de carro de alta durabilidade e desempenho, ideal para garantir a partida do seu veículo em qualquer condição. Tecnologia avançada para maior vida útil." },
  { id: "98", name: "Limpador de Para-brisa", price: 1000, originalPrice: 1500, discountPercentage: 33, image: "/images/4.png", category: "Ofertas do Dia", description: "Limpador de para-brisa concentrado, remove sujeira, insetos e gordura, garantindo visibilidade perfeita em dias de chuva. Fórmula de alta performance para uma limpeza eficaz." },
  { id: "99", name: "Berço", price: 30000, originalPrice: 35000, discountPercentage: 14, image: "/images/familiacomtijela.png", category: "Ofertas do Dia", description: "Berço portátil e seguro para bebês, com colchão macio e laterais teladas para ventilação. Ideal para viagens e uso diário, proporcionando conforto e segurança ao seu bebê." },
  { id: "100", name: "Carrinho de Bebê", price: 40000, originalPrice: 45000, discountPercentage: 11, image: "/images/helo.webp", category: "Ofertas do Dia", description: "Carrinho de bebê leve e compacto, com assento reclinável e cinto de segurança de 5 pontos. Ideal para passeios e viagens, garantindo conforto e segurança ao seu bebê." },
  { id: "101", name: "Cadeira de Alimentação", price: 20000, originalPrice: 25000, discountPercentage: 20, image: "/images/images.jpg", category: "Ofertas do Dia", description: "Cadeira de alimentação ajustável e segura para bebês, com bandeja removível e cinto de segurança. Ideal para refeições em família, proporcionando conforto e praticidade." },
  { id: "102", name: "Fraldas", price: 4000, originalPrice: 5000, discountPercentage: 20, image: "/images/images.png", category: "Ofertas do Dia", description: "Pacote de fraldas descartáveis de alta absorção, com ajuste confortável e barreiras antivazamento. Ideal para manter seu bebê seco e protegido por mais tempo." },

  // Mais Avaliados
  { id: "2", name: "Bone", price: 1500, image: "/images/bone.jpeg", category: "Mais Avaliados", description: "Boné clássico e estiloso, perfeito para proteger do sol ou complementar seu visual. Feito com material durável e ajuste confortável." },
  { id: "3", name: "Bone Esportivo", price: 1500, image: "/images/boneesportivos.jpg", category: "Mais Avaliados", description: "Boné esportivo com tecido respirável, ideal para atividades físicas. Oferece conforto e proteção UV, mantendo você fresco e seco." },
  { id: "6", name: "Chapéu", price: 1500, image: "/images/chapeu.jpeg", category: "Mais Avaliados", description: "Chapéu elegante e versátil, ideal para diversas ocasiões. Adiciona um toque de sofisticação ao seu estilo e oferece proteção solar." },
  { id: "17", name: "Terno", price: 1500, image: "/images/terno.png", category: "Mais Avaliados", description: "Terno masculino elegante e sob medida, ideal para ocasiões formais e eventos de negócios. Confeccionado com tecido de alta qualidade para um caimento impecável." },
  { id: "18", name: "Vestido", price: 1500, image: "/images/vestido.png", category: "Mais Avaliados", description: "Vestido feminino versátil, perfeito para o dia a dia ou eventos casuais. Confortável e com design moderno, realça a beleza feminina." },
  { id: "19", name: "Sapatos Sociais", price: 1500, image: "/images/sapatossocias.png", category: "Mais Avaliados", description: "Sapatos sociais masculinos de couro legítimo, sinônimo de elegância e conforto. Ideal para compor looks sofisticados e profissionais." },
  { id: "25", name: "Ténis Esportivo", price: 5000, image: "/images/tenisesporte.png", category: "Mais Avaliados", description: "Tênis esportivo de alta performance, projetado para corrida e treinos intensos. Amortecimento superior e suporte para os pés." },

  // Dia das Crianças
  { id: "7", name: "Chinela 1", price: 1500, image: "/images/chinela4.webp", category: "Dia das Crianças", description: "Chinela infantil colorida e confortável, perfeita para o dia a dia das crianças. Material resistente e solado antiderrapante." },
  { id: "8", name: "Chinela 2", price: 1500, image: "/images/chinelas.jpg", category: "Dia das Crianças", description: "Chinela com design divertido para os pequenos. Leve, macia e fácil de calçar, ideal para brincadeiras e passeios." },
  { id: "9", name: "Chinelo", price: 1500, image: "/images/chinelasplasticas.jpeg", category: "Dia das Crianças", description: "Chinelo de plástico resistente e fácil de limpar, ótimo para piscina e praia. Conforto e segurança para os pés das crianças." },
  { id: "10", name: "Crocs", price: 1500, image: "/images/crocsbranca.jpg", category: "Dia das Crianças", description: "Crocs branco clássico, super confortável e versátil. Ideal para uso diário, com design ergonômico e material leve." },
  { id: "30", name: "Caixa de Madeira", price: 3000, image: "/images/caixamadeira.png", category: "Dia das Crianças", description: "Caixa de madeira artesanal, perfeita para guardar brinquedos, objetos ou como item decorativo. Durável e com acabamento rústico." },
  { id: "31", name: "Colete", price: 2000, image: "/images/colete.png", category: "Dia das Crianças", description: "Colete infantil colorido e divertido, ideal para complementar o visual dos pequenos. Confortável e fácil de vestir." },

  // Echo e Fire TV
  { id: "20", name: "Panela", price: 1500, image: "/images/panela.jpg", category: "Echo e Fire TV", description: "Panela antiaderente de alta durabilidade, essencial para sua cozinha. Cozinhe seus pratos favoritos com facilidade e segurança." },
  { id: "21", name: "Echo Dot", price: 8000, image: "/images/echodot.jpg", category: "Echo e Fire TV", description: "Echo Dot com Alexa, controle sua casa inteligente, toque música, configure alarmes e obtenha informações instantâneas usando apenas sua voz." },
  { id: "22", name: "Fire TV Stick", price: 12000, image: "/images/firetvstick.jpg", category: "Echo e Fire TV", description: "Fire TV Stick para transformar sua TV em Smart TV. Acesse milhares de apps, filmes, séries e canais de streaming com alta qualidade de imagem." },
  { id: "23", name: "Fire TV Cube", price: 25000, image: "/images/firetvcube.jpg", category: "Echo e Fire TV", description: "Fire TV Cube combina streaming em 4K Ultra HD com controle por voz hands-free, ideal para cinema em casa." },
  { id: "24", name: "Echo Show", price: 30000, image: "/images/echoshow.jpg", category: "Echo e Fire TV", description: "Echo Show com tela sensível ao toque, ideal para videochamadas, receitas interativas e controle da sua casa inteligente." },

  // Bicicletas infantis
  { id: "103", name: "Bicicleta Infantil 12''", price: 15000, image: "/images/500.png", category: "Bicicletas infantis", description: "Bicicleta infantil com rodinhas auxiliares, ideal para crianças de 3 a 6 anos." },
  { id: "104", name: "Bicicleta Infantil 16''", price: 20000, image: "/images/501.png", category: "Bicicletas infantis", description: "Bicicleta infantil leve e resistente, com design colorido para diversão segura." },
  { id: "105", name: "Bicicleta Infantil 20''", price: 25000, image: "/images/502.png", category: "Bicicletas infantis", description: "Bicicleta infantil com freio a disco e quadro reforçado, perfeita para iniciantes." },
  { id: "106", name: "Bicicleta Infantil 24''", price: 30000, image: "/images/503.png", category: "Bicicletas infantis", description: "Bicicleta infantil grande, confortável e segura, ideal para crianças mais altas." },

  // Espelhos
  { id: "107", name: "Espelho Decorativo Redondo", price: 5000, image: "/images/504.png", category: "Espelhos", description: "Espelho redondo com moldura elegante, perfeito para sala ou quarto." },
  { id: "108", name: "Espelho Quadrado", price: 4500, image: "/images/505.png", category: "Espelhos", description: "Espelho quadrado moderno, ideal para decoração minimalista." },
  { id: "109", name: "Espelho de Parede Grande", price: 10000, image: "/images/506.png", category: "Espelhos", description: "Espelho grande para parede, ótimo para ampliar ambientes." },
  { id: "110", name: "Espelho com Moldura de Madeira", price: 8000, image: "/images/507.png", category: "Espelhos", description: "Espelho com moldura rústica de madeira, combina com diversos estilos de decoração." },

  // Faça Login
  { id: "111", name: "Login Premium", price: 0, image: "/images/513.png", category: "Faça Login", description: "Acesse sua conta para desbloquear ofertas exclusivas e acompanhar seus pedidos." },
  { id: "112", name: "Criar Conta", price: 0, image: "/images/514.png", category: "Faça Login", description: "Cadastre-se gratuitamente e tenha acesso a promoções e descontos especiais." },
  { id: "113", name: "Área do Cliente", price: 0, image: "/images/515.png", category: "Faça Login", description: "Gerencie suas informações, acompanhe seus pedidos e veja seu histórico de compras." },
  { id: "114", name: "Central de Ajuda", price: 0, image: "/images/516.png", category: "Faça Login", description: "Precisa de ajuda? Acesse nossa central de suporte e tire todas as suas dúvidas." }
];