import { getCategories } from "../../helper/axios";
import { setCategories } from "../../pages/category/categorySlice";
import { setCatalogue } from "../../pages/mainCategory/mainCatSlice";

export const getCatagoriesAction = () => async (dispatch) => {
  const { data, result } = await getCategories();
  if (data?.length) {
    dispatch(setCategories(data));
  }
  if (result?.length) {
    dispatch(setCatalogue(result));
  }
};
