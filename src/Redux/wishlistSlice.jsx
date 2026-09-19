import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addToCartwishlist = createAsyncThunk(
   "wishlist/getWishlist",
  async ({ productId, productModel }, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId,
          productModel
        }),
      });

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


export const getCartwishlist = createAsyncThunk(
  "wishlist/getWishlist",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:8080/wishlist", {
        method: "GET",
        credentials: "include",
      });

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


export const romovewishlistdelet = createAsyncThunk(
  "wishlist/removeWishlist",
  async (wishlistId, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8080/wishlist/${wishlistId}`,
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



export const clearUserCart  = createAsyncThunk(
  "UserCart/removeUserCart",
  async (_ , { rejectWithValue }) => {
    try {
      const res = await fetch(
        `http://localhost:8080/clearUserCart`,
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

const initialState = {
  wishlist: [],
  loading: false,
  error: null,
};

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
.addCase(clearUserCart.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(clearUserCart.fulfilled, (state) => {
  state.loading = false;
  state.cart = [];
})

.addCase(clearUserCart.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
});
  },
});

export const { addToWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;