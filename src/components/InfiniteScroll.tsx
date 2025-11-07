"use client";

import React, { useState, useRef, useCallback } from "react";
import Product from "./Product";
import { ProductType } from "../types/ProductType";

type InfiniteScrollProps = {
  initialProducts: ProductType[];
  loadMore?: () => void;
  hasMore?: boolean;
};

export default function InfiniteScroll({
  initialProducts,
  loadMore,
  hasMore = false,
}: InfiniteScrollProps) {
  const [products] = useState(initialProducts || []);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && loadMore) {
          loadMore?.();
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, loadMore]
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 xl:gap-6">
      {products.map((product, index) => {
        const isLast = index === products.length - 1;
        return (
          <div key={product.id} ref={isLast ? lastElementRef : null}>
            <Product product={product} />
          </div>
        );
      })}
    </div>
  );
}
