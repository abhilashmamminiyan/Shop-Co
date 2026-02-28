import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./slices/filterSlice";
import productReducer from "./slices/productSlice";
import categoryReducer from "./category/categorySlice";
import authReducer from "./slices/auth";
import cartReducer from "./slices/cart";
import orderReducer from "./slices/order";
import userReducer from "./slices/userSlice";
import reviewReducer from "./reviews/reviewSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    products: productReducer,
    category: categoryReducer,
    auth: authReducer,
    cart: cartReducer,
    orders: orderReducer,
    users: userReducer,
    reviews: reviewReducer,
  },
});
