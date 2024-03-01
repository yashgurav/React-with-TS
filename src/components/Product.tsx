import { memo } from "react";
import { ReducerAction, ReducerActionType } from "../context/CartProvider";
import { ProductType } from "../context/ProductsProvider";

type ProductProps = {
  product: ProductType;
  dispatch: React.Dispatch<ReducerAction>;
  reducerActions: ReducerActionType;
  inCart: boolean;
};

const Product = ({
  product,
  dispatch,
  reducerActions,
  inCart,
}: ProductProps) => {
  const img: string = new URL(`../images/${product.sku}.jpg`, import.meta.url)
    .href;

  const onAddToCart = () =>
    dispatch({ type: reducerActions.ADD, payload: { ...product, qty: 1 } });

  const itemInCart = inCart ? " → Item in Cart: ✔️" : null;

  return (
    <article className="product">
      <h3>{product.name}</h3>
      <img src={img} alt={product.name} className="product__img" />
      <p>
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(product.price)}
        {itemInCart}
      </p>
      <button onClick={onAddToCart}>Add to Cart</button>
    </article>
  );
};

function areProductsEqual(
  { product: prevProduct, inCart: prevInCart }: ProductProps,
  { product: nextProduct, inCart: nextInCart }: ProductProps
) {
  return (
    Object.keys(prevProduct).every((key) => {
      return (
        prevProduct[key as keyof ProductType] ===
        nextProduct[key as keyof ProductType]
      );
    }) && prevInCart === nextInCart
  );
}
const MemoizedProduct = memo<typeof Product>(Product, areProductsEqual);

export default MemoizedProduct;
