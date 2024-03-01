import { useState } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const [viewCart, setViewCart] = useState<boolean>(false);

  return (
    <>
      <Header viewCart={viewCart} setViewCart={setViewCart} />
      {viewCart ? <Cart /> : <ProductList />}
      <Footer viewCart={viewCart} />;
    </>
  );
}

export default App;
