import useCart from "../hooks/useCart";
import Nav from "./Nav";

type HeaderProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header = ({ viewCart, setViewCart }: HeaderProps) => {
  const { totalItems, totalPrice } = useCart();
  return (
    <header className="header">
      <div className="__title-bar">
        <h1>TCS</h1>
        <div className="header__price-box">
          <p>Total Items: {totalItems}</p>
          <p>Total Price: {totalPrice}</p>
        </div>
      </div>
      <Nav viewCart={viewCart} setViewCart={setViewCart} />
    </header>
  );
};

export default Header;
