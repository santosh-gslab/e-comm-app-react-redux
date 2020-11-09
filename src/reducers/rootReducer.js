import { combineReducers } from "redux";
import productReducers from "./products-reducer";
import cartReducers from "./cart-reducer.js";

export default combineReducers({
  productList: productReducers,
  cartItems: cartReducers,
});