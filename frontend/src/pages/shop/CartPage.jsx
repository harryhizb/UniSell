import React from "react";
import CartModal from "./CartModal"; // Assuming this is the correct import
import { useSelector } from "react-redux";
import OrderSummary from "./OrderSummary";

const CartPage = () => {
  const products = useSelector((store) => store.cart.products);

  return (
    <section className="section__container product__container">
      <div className="flex lg:flex-row flex-col-reverse justify-center lg:space-x-40">
        <div className="space-y-5 lg:mt-0 mt-5">
          {products.length ? (
            products.map((product) => (
              <CartModal key={product._id} product={product} /> // Use unique _id for key
            ))
          ) : (
            <p className="text-2xl text-red-500">No product found!</p>
          )}
        </div>
        <OrderSummary />
      </div>
    </section>
  );
};

export default CartPage;