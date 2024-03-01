type NavProps = {
  viewCart: boolean;
  setViewCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const Nav = ({ viewCart, setViewCart }: NavProps) => {
  return (
    <nav className="nav">
      <button onClick={() => setViewCart((prevViewCart) => !prevViewCart)}>
        {viewCart ? "View Poducts" : "View Cart"}
      </button>
    </nav>
  );
};

export default Nav;
