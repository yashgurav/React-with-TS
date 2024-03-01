import React from "react";
import useProducts from "../hooks/useProducts";
import useCart from "../hooks/useCart";
import Product from "./Product";

const ProductList = () => {
  const { dispatch, cart, REDUCER_ACTIONS } = useCart();
  const { products } = useProducts();

  return (
    <main className="main main--products">
      {products?.length ? (
        <>
          {products.map((product) => {
            const inCart: boolean = cart.some(
              (item) => item.sku === product.sku
            );
            return (
              <Product
                key={product.sku}
                product={product}
                dispatch={dispatch}
                reducerActions={REDUCER_ACTIONS}
                inCart={inCart}
              />
            );
          })}
        </>
      ) : (
        <p>Loading....</p>
      )}
    </main>
  );
};

export default ProductList;
