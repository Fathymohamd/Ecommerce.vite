import { configureStore } from "@reduxjs/toolkit";
import cartslise from "./createSlice"
export const store = configureStore({
    reducer:{counter : cartslise}
})