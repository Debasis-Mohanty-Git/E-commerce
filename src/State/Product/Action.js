import { api } from "../../Config/apiConfig";
import { FIND_PRODUCT_BY_ID_FAILURE, FIND_PRODUCT_BY_ID_REQUEST, FIND_PRODUCT_BY_ID_SUCCESS, FIND_PRODUCTS_FAILURE, FIND_PRODUCTS_REQUEST, FIND_PRODUCTS_SUCCESS } from "./ActionType";

export const findProducts = (reqData) => async (dispatch) => {

    dispatch({ type: FIND_PRODUCTS_REQUEST });
    const { colors, 
        sizes, 
        minPrice, 
        maxPrice, 
        minDiscount, 
        category, 
        stock, 
        sort, pageNumber, pageSize } = reqData;
    try {
        const { data } = await api.get(`/api/products?color=${colors}&size=${sizes}&minPrice=${minPrice}
        &maxPrice=${maxPrice}&minDiscount=${minDiscount}
        &category=${category}&stock=${stock}&sort=${sort}
        &pageNumber=${pageNumber}&pageSize=${pageSize}`);

        console.log("product Data",data);
        dispatch({ type: FIND_PRODUCTS_SUCCESS, payload: data });

    } catch (error) {
        dispatch({ type: FIND_PRODUCTS_FAILURE, payload: error.message });
    }
}

export const findProductsById = (productId) => async (dispatch) => {
  dispatch({ type: FIND_PRODUCT_BY_ID_REQUEST });

  try {
    const { data } = await api.get(`/api/products/id/${productId}`);
    dispatch({ type: FIND_PRODUCT_BY_ID_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FIND_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
