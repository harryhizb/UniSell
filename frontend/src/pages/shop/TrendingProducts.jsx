import React, { useState } from "react";
import products from "../../data/products.json";
import ProductCards from "./ProductCards";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Discover Unique Finds: Elevate Your Experience with Our Curated
        Collection of Trending Products at UniSell.
      </p>

      {/* Products card */}
      <ProductCards products={products.slice(0, visibleProducts)} />

      {/* Load More button placed below the products */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
