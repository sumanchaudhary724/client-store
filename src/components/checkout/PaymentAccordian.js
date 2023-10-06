import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../pages/order/orderSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const initialState = {
  method: "",
  isPaid: false,
  cardNumber: "",
  expirationDate: "",
  cvv: "",
};

export const PaymentAccordian = ({ activeStep, totalAmount }) => {
  const { paymentMethods } = useSelector((store) => store.paymentInfo);
  const [open, setOpen] = useState(false);
  const [payment, setPayment] = useState(initialState);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
  );
  const stripe = useStripe();
  const elements = useElements();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({ ...payment, [name]: value });
  };

  useEffect(() => {
    if (activeStep === 2) {
      setOpen(!open);
    }
  }, [activeStep]);

  const handleOnContinue = async () => {
    // Validate payment method and other fields as needed
    if (
      !payment.method ||
      !payment.cardNumber ||
      !payment.expirationDate ||
      !payment.cvv
    ) {
      alert("Please fill in all payment details.");
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    // Create a PaymentMethod using the card information
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (result.error) {
      console.error(result.error);
      // Handle payment error
      alert("Payment failed. Please check your card details and try again.");
    } else {
      // Payment was successful, send the PaymentMethod ID to your server for further processing
      const paymentMethodId = result.paymentMethod.id;

      // Dispatch the payment method and other information to your Redux store
      dispatch(
        setOrder({
          payment: { ...payment, paymentMethodId },
          name: "paymentMethod",
        })
      );

      // Close the accordion
      setOpen(false);
    }
  };

  return (
    <Accordion expanded={open} disabled={activeStep < 2}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        onClick={() => {
          setOpen(!open);
        }}
      >
        <Typography variant="h5">3. Payment details</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormControl fullWidth>
          <FormLabel id="payment-methods">Choose the payment method</FormLabel>
          {paymentMethods.map((pay) => (
            <Paper elevation={2} sx={{ mt: 2, p: 2 }} key={pay._id}>
              <RadioGroup
                aria-labelledby="payment-methods"
                name="controlled-radio-buttons-group"
                value={payment.method}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={pay.title}
                  control={<Radio />}
                  label={pay.title}
                  checked={payment.method === pay.title}
                />
              </RadioGroup>
            </Paper>
          ))}

          {/* Payment input fields */}
          <Elements stripe={stripePromise}>
            <form onSubmit={handleOnContinue}>
              <CardElement
                options={{
                  // Customize the appearance of the CardElement
                  style: {
                    base: {
                      fontSize: "16px",
                    },
                  },
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2 }}
                disabled={!payment.method}
              >
                Continue
              </Button>
            </form>
          </Elements>
        </FormControl>
      </AccordionDetails>
    </Accordion>
  );
};
