import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../pages/cart/cartSlice";
import { setModal } from "../../components/modal/modalSlice";
import { ItemAddedModal } from "../modal/ItemAddedModal";

export const AddToCart = () => {
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const handleOnAdd = () => {
    dispatch(setCart(cart));
    dispatch(setModal(true));
  };
  return (
    <>
      <ItemAddedModal item={cart} />
      <Button
        variant="outlined"
        className="flex-grow-1"
        startIcon={<ShoppingCartCheckoutIcon />}
        onClick={handleOnAdd}
      >
        Add
      </Button>
    </>
  );
};
