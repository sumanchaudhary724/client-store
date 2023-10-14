import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { CustomModal } from "../../components/modal/CustomModal";
import { setModal } from "../../components/modal/modalSlice";
import { postOrderAction } from "../../pages/order/orderAction";
import { postOrder, payWithCard } from "../../helper/axios"; // Update with the appropriate axios functions

const webDomain = process.env.REACT_APP_WEB_DOMAIN;

const CheckoutForm = ({ clientSecret }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const { user, payment, orderItems } = useSelector((store) => store.orderInfo);
  const { modalName } = useSelector((store) => store.modalInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    try {
      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
          },
        });

          const loading = dispatch(
            postOrderAction({
              user,
              payment: { ...payment, isPaid: true },
              orderItems,
            })
          );
          const orderNumber = await loading;
          if (orderNumber) {
            navigate(`/cart/order/${orderNumber}`);
          }
        }
      }
    } catch (error) {
      setError(
        error.message || "An unexpected error occurred. Please try again."
      );
      console.error(error.message);
      dispatch(setModal({ isModalOpen: true, modalName: "errorMessage" }));
    }
  };

  return (
    <Box
      sx={{
        p: 2,
        width: { xs: 320, sm: 450, md: 400 },
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {modalName === "errorMessage" && (
        <CustomModal title="Error">
          <Typography variant="body" color={"error"}>
            {error}
          </Typography>
        </CustomModal>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          width: { xs: 300, sm: 430, md: 380 },
          height: "550px",
        }}
      >
        <h1>Billing Details</h1>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <Button
          type="submit"
          variant="contained"
          color="success"
          fullWidth
          sx={{ mt: 2 }}
          disabled={!orderItems.length || !stripe}
        >
          Pay Now
        </Button>
      </form>
    </Box>
  );
};

export default CheckoutForm;
