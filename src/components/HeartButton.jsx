"use client";
import { Heart } from "lucide-react";
import { useWishlist } from "../context/WishlistContext";

export default function HeartButton({ product }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const liked = wishlist.some((item) => item.id === product.id);

  const handleClick = () => {
    liked ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  return (
    <Heart
      size={22}
      className={`cursor-pointer transition ${
        liked ? "text-red-500" : "text-gray-700"
      } hover:text-[#0071BC]`}
      title={liked ? "Remover dos favoritos" : "Adicionar aos favoritos"}
      onClick={handleClick}
    />
  );
}
