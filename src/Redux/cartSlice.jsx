import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, productModel }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-black.vercel.app/cart",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            productId,
            productModel,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-black.vercel.app/cart",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (cartId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-black.vercel.app/cart/${cartId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.cart;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const increaseQuantity = async (productId) => {
  try {
    const res = await axios.patch(
      `https://ecommerce-vite-black.vercel.app/cart/increase/${productId}`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data.cart;
  } catch (error) {
    console.log("ERROR:", error.response?.data?.message);
    throw error;
  }
};

export const decreaseQuantity = async (productId) => {
  try {
    const res = await axios.patch(
      `https://ecommerce-vite-black.vercel.app/cart/decrease/${productId}`,
      {},
      {
        withCredentials: true,
      }
    );

    return res.data.cart;
  } catch (error) {
    console.log("ERROR:", error.response?.data?.message);
    throw error;
  }
};

const initialState = {
  cart: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    updateQuantity: (state, action) => {
      const updatedCart = action.payload;

      const item = state.cart.find(
        (item) => item._id === updatedCart._id
      );

      if (item) {
        item.quantity = updatedCart.quantity;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET CART =================
      .addCase(getCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || [];
      })

      .addCase(getCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD TO CART =================
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || [];
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= REMOVE FROM CART =================
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload || [];
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;