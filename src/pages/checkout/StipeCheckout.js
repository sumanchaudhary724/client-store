import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { CustomModal } from "../../components/modal/CustomModal";

const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);
export const StripeCheckout = ({ setStripeStatus, clientSecret }) => {
  const options = {
    // passing the client secret obtained in step 3
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };
  return (
    <>
      {clientSecret && (
        <CustomModal>
          <Elements stripe={stripePromise} options={options}>
            <CheckoutForm />
          </Elements>
        </CustomModal>
      )}
    </>
  );
};
