import { ReactNode, createContext, useEffect, useState } from "react";

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

export type UseProductsContextType = {
  products: ProductType[];
};

type ChildrenType = {
  children?: ReactNode;
};

const initState: ProductType[] = [];

const initContextState: UseProductsContextType = { products: [] };

const ProductsContext = createContext<UseProductsContextType>(initContextState);

export const ProductsProvider = ({ children }: ChildrenType) => {
  const [products, setProducts] = useState<ProductType[]>(initState);
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("http://localhost:3500/products")
        .then((res) => res.json())
        .catch((err) => {
          if (err instanceof Error) {
            console.log(err.message);
          }
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
