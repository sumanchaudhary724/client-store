import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import systemReducer from "./system/systemSlice";
import userReducer from "./pages/signin-signup/userSlice.js";
import productReducer from "./pages/product/productSlice.js";
import catReducer from "./pages/category/categorySlice.js";
import cartReducer from "./pages/cart/cartSlice.js";
import mainCatalogueReducer from "./pages/mainCategory/mainCatSlice.js";
import modalReducer from "./components/modal/modalSlice.js";
import displayReducer from "./pages/display/displayDataSlice.js";
import paymentReducer from "./pages/payment/paymentSlice.js";
import orderReducer from "./pages/order/orderSlice";
const userPersistConfig = {
  key: "userInfo",
  storage,
};
const cartPersistConfig = {
  key: "cartInfo",
  storage,
};
const orderPresistConfig = {
  key: "orderInfo",
  storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
const presistedOrderReducer = persistReducer(orderPresistConfig, orderReducer);
const store = configureStore({
  reducer: {
    system: systemReducer,
    userInfo: persistedUserReducer,
    categoryInfo: catReducer,
    productInfo: productReducer,
    display: displayReducer,
    cart: persistedCartReducer,
    modalInfo: modalReducer,
    mainCatalogueInfo: mainCatalogueReducer,
    paymentInfo: paymentReducer,
    orderInfo: presistedOrderReducer,
  },
});
const persistor = persistStore(store);
export { store, persistor };
