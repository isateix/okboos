"use client";

import React, { useState, useEffect } from 'react';
import { products, Product } from '../../../data/products';
import { useCart } from '../../../context/CartContext';
import { Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '../../../components/ProductCard';
import SuccessModal from '../../../components/SuccessModal'; // Import SuccessModal

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  console.log("ProductDetailPage: productId from useParams:", productId);
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [quantityToAdd, setQuantityToAdd] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [stock, setStock] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State for modal visibility
  const [successMessage, setSuccessMessage] = useState(''); // State for modal message

  useEffect(() => {
    const foundProduct = products.find(p => p.id === productId);
    console.log("ProductDetailPage: foundProduct:", foundProduct);
    if (foundProduct) {
      setProduct(foundProduct);
      setStock(foundProduct.quantity ?? 10);
      setSelectedColor(foundProduct.colors?.[0] || '');

      // Filter related products
      const related = products.filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id
      );
      setRelatedProducts(related);
    }
  }, [productId]);

  if (!product) {
    return <div className="container mx-auto p-4 text-center text-xl">Produto não encontrado.</div>;
  }

  const handleAddToCart = () => {
    if (stock < quantityToAdd) {
      alert("Produto esgotado!"); // Keep alert for out of stock
      return;
    }
    addToCart({ ...product, quantidade: Number(quantityToAdd), selectedColor });
    setSuccessMessage(`${quantityToAdd} ${product.name} adicionado(s) ao carrinho!`);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    setSuccessMessage('');
  };

  const rating = 4; // Static rating for now

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-8 mb-8">
        {/* Left Side: Product Image */}
        <div className="md:w-1/2 flex justify-center items-center">
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={product.image}
              alt={product.name}
              fill
              style={{ objectFit: 'contain' }}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Right Side: Product Details and Controls */}
        <div className="md:w-1/2 p-4 flex flex-col">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className={i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
              />
            ))}
            <span className="text-gray-600 text-sm ml-2">(4.0)</span>
          </div>

          <p className="text-gray-700 text-base mb-4 flex-grow">{product.description}</p>

          <div className="mb-4">
            {product.originalPrice && product.originalPrice > product.price && (
              <p className="text-gray-500 line-through text-lg">
                {product.originalPrice.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
              </p>
            )}
            <p className="text-3xl font-bold text-blue-600">
              {product.price.toLocaleString('pt-AO', { style: 'currency', currency: 'AOA' })}
            </p>
            {product.discountPercentage && product.discountPercentage > 0 && (
              <p className="text-green-600 font-bold text-lg">Economize {product.discountPercentage}%!</p>
            )}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Cor:</label>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-blue-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.toLowerCase() === 'preto' ? '#000' : color.toLowerCase() === 'branco' ? '#fff' : color.toLowerCase() === 'azul' ? '#3b82f6' : color.toLowerCase() === 'marrom' ? '#8b4513' : color.toLowerCase()}}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">Quantidade:</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantityToAdd((prev) => Math.max(1, prev - 1))}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                -
              </button>
              <span className="text-xl font-semibold text-gray-900 w-8 text-center">{quantityToAdd}</span>
              <button
                onClick={() => setQuantityToAdd((prev) => prev + 1)}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                +
              </button>
            </div>
            {stock !== undefined && stock < 10 && (
              <p className="text-sm text-red-500 mt-2">Apenas {stock} unidades restantes!</p>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition shadow-md mt-auto"
          >
            Adicionar {quantityToAdd} ao Carrinho
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Produtos Relacionados</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}

      {showSuccessModal && (
        <SuccessModal
          message={successMessage}
          onClose={handleCloseSuccessModal}
        />
      )}
    </div>
  );
}
