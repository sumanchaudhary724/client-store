import { getAllPaymentMethods } from "../../helper/axios";
import { setPaymentMethods } from "../payment/paymentSlice";

export const getPaymentMethodAction = () => async (dispatch) => {
  const { status, result } = await getAllPaymentMethods();
  if (status === "success") {
    dispatch(setPaymentMethods(result));
  }
};
