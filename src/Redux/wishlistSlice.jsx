import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


// ================= ADD TO WISHLIST =================

export const addToCartwishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async ({ productId, productModel }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/wishlist",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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

      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ================= GET WISHLIST =================

export const getCartwishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/wishlist",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ================= REMOVE FROM WISHLIST =================

export const romovewishlistdelet = createAsyncThunk(
  "wishlist/removeWishlist",
  async (wishlistId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-two.vercel.app/wishlist/${wishlistId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.wishlist;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);




export const clearUserCart = createAsyncThunk(
  "UserCart/removeUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/clearUserCart",
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// ================= INITIAL STATE =================

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};


// ================= WISHLIST SLICE =================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const existing = state.wishlist.find(
        (item) => item._id === action.payload._id
      );

      if (!existing) {
        state.wishlist.push({
          ...action.payload,
        });
      }
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET WISHLIST =================

      .addCase(getCartwishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCartwishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload || [];
      })

      .addCase(getCartwishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ================= REMOVE WISHLIST =================

      .addCase(romovewishlistdelet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(romovewishlistdelet.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = action.payload || [];
      })

      .addCase(romovewishlistdelet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      // ================= CLEAR CART =================

      .addCase(clearUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(clearUserCart.fulfilled, (state) => {
        state.loading = false;
        state.wishlist = [];
      })

      .addCase(clearUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export const { addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;