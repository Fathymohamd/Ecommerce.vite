import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  fakestoreap: [],
  productsTolist: [],
  product : [],
  cartData: [],
   category: [],
  Loading: false,
  error: false,
  selectedCategories: [],
};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-black.vercel.app/api/products",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message);
      }

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// =========================
// Get Products By Category
// =========================
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-black.vercel.app/api/products/category/${category}`,
        {
          method: "GET",
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


// =========================
// Get Products By Price
// =========================
export const fetchAllProductS = createAsyncThunk(
  "products/fetchByPrice",
  async ({ min, max }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-black.vercel.app/api/products/price?min=${min}&max=${max}`,
        {
          method: "GET",
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


// =========================
// Get Product By ID
// =========================
export const fetchById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-black.vercel.app/api/products/${id}`,
        {
          method: "GET",
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


// =========================
// Get All Users
// =========================
export const fetchFakeStore = createAsyncThunk(
  "fakestore/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-black.vercel.app/api/users",
        {
          method: "GET",
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


// =========================
// Get User By ID
// =========================
export const fetchFakeStoreid = createAsyncThunk(
  "feature/action",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `https://ecommerce-vite-black.vercel.app/api/users/${id}`,
        {
          method: "GET",
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

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

  toggleCategory: (state, action) => {
    const category = action.payload;

    if (state.selectedCategories.includes(category)) {
      state.selectedCategories = state.selectedCategories.filter(
        (item) => item !== category
      );
    } else {
      state.selectedCategories.push(category);
    }
  },

  clearCart: (state) => {
  state.cartData = [];
  localStorage.removeItem("cart");
}
  },

  extraReducers: (builder) => {
    builder
  
      .addCase(fetchAllProducts.pending, (state) => {
        state.Loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.Loading = false;
        state.data = action.payload;
      })
       
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
       state.Loading = false;
       state.selectedCategories = action.payload;
       })

      .addCase(fetchById.fulfilled, (state, action) => {
        state.Loading = false;
        state.productsTolist = action.payload;
      })
      
      .addCase(fetchAllProductS.fulfilled , (state , action) => {
        state.Loading = false;
        state.data = action.payload;
      }) 

      .addCase(fetchFakeStore.fulfilled, (state, action) => {
        state.Loading = false;
        state.fakestoreap = action.payload;
      })
     .addCase(fetchFakeStoreid.fulfilled, (state, action) => {
     state.Loading = false;
      state.product = action.payload;
      })
      

      .addCase(fetchAllProducts.rejected, (state) => {
        state.Loading = false;
        state.error = true;
      });
  },
});

export const { addToCart, Remove , increaseQuantity , decreaseQuantity   
, toggleCategory  , clearCart} = cartSlice.actions;
export default cartSlice.reducer;