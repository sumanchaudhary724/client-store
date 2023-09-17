import { getProducts } from "../../helper/axios";
import { setDisplayData } from "../display/displayDataSlice";
import { setProducts } from "../../pages/product/productSlice";

export const getProductsAction = () => async (dispatch) => {
  const { data } = await getProducts();
  if (data?.length) {
    dispatch(setProducts(data));
    // dispatch(setDisplayData(data));
  }
};
