import { toast } from "react-toastify";
import { postOrder } from "../../helper/axios";
import { resetCart } from "../cart/cartSlice";

export const postOrderAction = (object) => async (dispatch) => {
  const { status, message, orderNumber } = await postOrder(object);
  toast[status](message);
  if (status === "success") {
    dispatch(resetCart());
    return orderNumber;
  }
};
