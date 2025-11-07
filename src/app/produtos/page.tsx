import ProdutosPage from "./ProdutosPage";

export const metadata = {
  title: "Produtos",
  description: "Lista de produtos",
};

export default function Page({ searchParams }: { searchParams?: { search?: string; category?: string | string[] } }) {
  // Apenas repassa searchParams para o client component
  return <ProdutosPage searchParams={searchParams} />;
}
