import { Box, Button, Typography } from "@mui/material";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import { setModal } from "../../components/modal/modalSlice";
const CheckoutForm = () => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const { paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout",
      },
    });
    if (paymentIntent.status === "succeeded") {
      dispatch(setModal({ isModalOpen: false, modalName: "stripe" }));
    }
  };
  return (
    <Box sx={{ margin: "auto" }}>
      <form style={{ width: "400px", margin: "auto" }}>
        <h1>Billing Details</h1>
        <PaymentElement options={{ layout: "tabs" }} />
        <Button
          variant="contained"
          color="success"
          onClick={handleOnSubmit}
          fullWidth
          sx={{ mt: 2 }}
        >
          Pay Now
        </Button>
        <Typography variant="body" color={"error"}>
          Error
        </Typography>
      </form>
    </Box>
  );
};

export default CheckoutForm;
