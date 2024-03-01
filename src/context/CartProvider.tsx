import { ReactNode, createContext, useMemo, useReducer } from "react";

export type CartItemType = {
  sku: string;
  name: string;
  price: number;
  qty: number;
};

type CartStateType = { cart: CartItemType[] };

const REDUCER_ACTION_TYPE = {
  ADD: "ADD",
  REMOVE: "REMOVE",
  QUANTITY: "QUANTITY",
  SUBMIT: "SUBMIT",
};

export type ReducerActionType = typeof REDUCER_ACTION_TYPE;

export type ReducerAction = {
  type: string;
  payload?: CartItemType;
};

type ChildrenType = {
  children?: ReactNode;
};

const initCartState: CartStateType = { cart: [] };

const reducer = (
  state: CartStateType,
  action: ReducerAction
): CartStateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD: {
      if (!action.payload) {
        throw new Error("Payload missing");
      }
      const { sku, name, price } = action.payload;

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      const qty: number = itemExists ? itemExists.qty : 1;
      return { ...state, cart: [...filteredCart, { sku, name, price, qty }] };
    }

    case REDUCER_ACTION_TYPE.REMOVE:
      {
        if (!action.payload) {
          throw new Error("Payload missing");
        }
        const { sku } = action.payload;

        const filteredCart: CartItemType[] = state.cart.filter(
          (item) => item.sku !== sku
        );

        return { ...state, cart: [...filteredCart] };
      }
      break;

    case REDUCER_ACTION_TYPE.QUANTITY: {
      if (!action.payload) {
        throw new Error("Payload missing");
      }

      const { sku, qty } = action.payload;

      const itemExists: CartItemType | undefined = state.cart.find(
        (item) => item.sku === sku
      );

      if (!itemExists) {
        throw new Error("Item must exist");
      }

      const updatedItem: CartItemType = { ...itemExists, qty };

      const filteredCart: CartItemType[] = state.cart.filter(
        (item) => item.sku !== sku
      );
      return { ...state, cart: [...filteredCart, updatedItem] };
    }
    case REDUCER_ACTION_TYPE.SUBMIT: {
      return { ...state, cart: [] };
    }

    default:
      throw new Error("unidentified action");
  }
};

const useCartContext = (initCartState: CartStateType) => {
  const [state, dispatch] = useReducer(reducer, initCartState);

  const REDUCER_ACTIONS = useMemo(() => {
    return REDUCER_ACTION_TYPE;
  }, []);

  const totalItems: number = state.cart.reduce(
    (prevValue, cartItem) => prevValue + cartItem.qty,
    0
  );

  const totalPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(
    state.cart.reduce(
      (prevValue, cartItem) => prevValue + cartItem.qty * cartItem.price,
      0
    )
  );

  const cart = state.cart.sort((a, b) => {
    const itemA = Number(a.sku.slice(-4));
    const itemB = Number(b.sku.slice(-4));
    return itemA - itemB;
  });

  return { dispatch, totalItems, totalPrice, cart, REDUCER_ACTIONS };
};

export type UseCartContextType = ReturnType<typeof useCartContext>;

const initCartContextState: UseCartContextType = {
  dispatch: () => {},
  totalItems: 0,
  totalPrice: "0",
  cart: [],
  REDUCER_ACTIONS: REDUCER_ACTION_TYPE,
};

export const CartContext =
  createContext<UseCartContextType>(initCartContextState);

export const CartProvider = ({ children }: ChildrenType) => {
  return (
    <CartContext.Provider value={useCartContext(initCartState)}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
