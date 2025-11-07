import { products } from '../data/products';
import Product from '../components/Product';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto pt-8 px-4 xl:px-0">
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
