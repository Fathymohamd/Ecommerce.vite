import { configureStore } from "@reduxjs/toolkit";

import createSlice from "./createSlice";
import authReducer from "./authSlice";
import CartSlice from "./cartSlice";
import wishlistSlice from "./wishlistSlice";
import settingsRedux from "./settingsRedux";
import Notifications from "./Notifications";
import darkModeReducer from "./darkMode";
import contactReducer from "./Contact";

export const store = configureStore({
  reducer: {
    counter: createSlice,
    auth: authReducer,
    cart: CartSlice,
    wishlist: wishlistSlice,
    settings: settingsRedux,
    notifications: Notifications,
    darkMode: darkModeReducer,
    contact: contactReducer,
  },
});