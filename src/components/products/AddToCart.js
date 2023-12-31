import { Button } from "@mui/material";
import React from "react";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../pages/cart/cartSlice";
import { setModalShow } from "../../system/systemSlice";
import { ItemAddedModal } from "../modal/ItemAddedModal";

export const AddToCart = ({ item }) => {
  // console.log(item);
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const handleOnAdd = () => {
    dispatch(setCart(item));
    dispatch(setModalShow(true));
  };
  return (
    <>
      <ItemAddedModal item={item} />
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
