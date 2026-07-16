import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: [],
  fakestoreap: [],
  productsTolist: [],
  product : [],
  cartData: JSON.parse(localStorage.getItem("cart")) || [],
   category: [],
  Loading: false,
  error: false,
  selectedCategories: [],

};

export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://ecommerce-vite-fgou.vercel.app/api/products");
    const data = await res.json();
    return data.products;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (category) => {
    const res = await fetch(
      `http://localhost:8080/api/products/category/${category}`
    );
    return await res.json();
  }
);

export const fetchAllProductS = createAsyncThunk(
  "products/fetchByPrice",
  async ({ min, max }) => {
    const res = await fetch(
      `http://localhost:8080/api/products?min=${min}&max=${max}`
    );
    const data = await res.json();
    return data;
  }
);

export const fetchById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const res = await fetch(`https://ecommerce-vite-fgou.vercel.app/api/products/${id}`);
    return await res.json();
  }
);


export const fetchFakeStore = createAsyncThunk(
  "fakestore/fetchAll",
  async () => {
    const res = await fetch("https://ecommerce-vite-fgou.vercel.app/api/users");
    const data = await res.json();

  return data;
  }
);

export const fetchFakeStoreid = createAsyncThunk(
  "feature/action",
  async (id) => {
    const res = await fetch(`https://ecommerce-vite-fgou.vercel.app/api/users/${id}`);
    return await res.json();
  }
);


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    Remove: (state, action) => {
      state.cartData = state.cartData.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

    addToCart: (state, action) => {
      const existing = state.cartData.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartData.push({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartData));
    },

increaseQuantity:(state , action) => {
  const item = state.cartData.find(i => i.id === action.payload)
  if(item){
 item.quantity += 1;
  }
},
decreaseQuantity: (state, action) => {
  const item = state.cartData.find(i => i.id === action.payload);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  }
},
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
       state.data = action.payload;
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