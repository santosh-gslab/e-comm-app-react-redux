import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/types";

const initState = { items: [] };
export default function (state = initState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return { ...state, items: action.payload.cartItems };
    case REMOVE_FROM_CART:
      return { ...state, items: action.payload.cartItems };
    default:
      return state;
  }
}