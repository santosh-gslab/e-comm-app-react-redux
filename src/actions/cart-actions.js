import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

export const addToCart = (items, product) => (dispatch) => {  
  const cartItems = items.slice();
  let productAlreadyInCart = false;

  cartItems.forEach((cp) => {
    if (cp.id === product.id && cp.quantity === product.quantity) {
      productAlreadyInCart = true;
    }
  });

  if (!productAlreadyInCart) {
    cartItems.push({ ...product });
  }
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  dispatch({ type: ADD_TO_CART, payload: { cartItems } });
};