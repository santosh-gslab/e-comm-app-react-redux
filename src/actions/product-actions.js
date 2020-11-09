import {FETCH_PRODUCTS} from "./types";
import config from '../config';
  
export const fetchProducts = () => (dispatch) => {
fetch(`${config.baseURL}${config.apis['products']}`)
    .then((res) => 
        res.json()
    )
    .catch((err) =>
        console.log(err)
    )
    .then((data) => {
        dispatch({ type: FETCH_PRODUCTS, payload: data });
    });
};