import { configureStore } from "@reduxjs/toolkit";
import systemReducer from "./system/systemSlice";
import userReducer from "./pages/signin-signup/userSlice.js";
import productReducer from "./pages/product/productSlice.js";
import catReducer from "./pages/category/categorySlice.js";
import presistedCartReducer from "./pages/cart/cartSlice.js";
import mainCatalogueReducer from "./pages/mainCategory/mainCatSlice.js";
import modalReducer from "./components/modal/modalSlice.js";
export default configureStore({
  reducer: {
    system: systemReducer,
    userInfo: userReducer,
    catagoryInfo: catReducer,
    productInfo: productReducer,
    display: displayReducer,
    cart: presistedCartReducer,
    modalInfo: modalReducer,
    mainCatalogueInfo: mainCatalogueReducer,
  },
});
