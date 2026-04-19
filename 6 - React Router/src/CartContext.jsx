import { createContext, useReducer, useContext } from "react";

export const CartContext = createContext();

const initialState = {
  cart: [],
  fav: [],
  products: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find(i => i.id === action.payload.id);

      if (existing) {
        return {
          ...state,
          cart: state.cart.map(i =>
            i.id === action.payload.id
              ? { ...i, qty: (i.qty || 1) + 1 }
              : i
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, qty: 1 }],
      };
    }

    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + 1 }
            : i
        ),
      };

    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty > 1 ? i.qty - 1 : 1 }
            : i
        ),
      };


    case "ADD_TO_FAV":
      return { ...state, fav: [...state.fav, action.payload] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id),
      };

    case "REMOVE_FROM_FAV":
      return {
        ...state,
        fav: state.fav.filter(item => item.id !== action.payload.id),
      };

    case "SET_PRODUCTS":
      return {
        ...state,
        products: action.payload,
      };

    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
