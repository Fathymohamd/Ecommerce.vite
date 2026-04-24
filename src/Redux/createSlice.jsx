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
};


export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async () => {
    const res = await fetch("https://dummyjson.com/products");
    return (await res.json()).products;
  }
);

export const fetchById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    return await res.json();
  }
);


export const fetchFakeStore = createAsyncThunk(
  "fakestore/fetchAll",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
   
    return await res.json();
  }
);

export const fetchFakeStoreid = createAsyncThunk(
 "feature/action",
  async (id)=>{
    const res = await fetch(`https://fakestoreapi.com/products/${id}`)
    return await res.json()
  }
)

export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (category) => {
    const res = await fetch(
     `https://dummyjson.com/products/category/${category}`
    );
    const data = await res.json();
    return data.products;
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

    
      .addCase(fetchById.fulfilled, (state, action) => {
        state.Loading = false;
        state.productsTolist = action.payload;
      })


      .addCase(fetchFakeStore.fulfilled, (state, action) => {
        state.Loading = false;
        state.fakestoreap = action.payload;
      })
     .addCase(fetchFakeStoreid.fulfilled, (state, action) => {
     state.Loading = false;
      state.product = action.payload;
      })

   .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
  state.Loading = false;
  state.category = action.payload;
})

      .addCase(fetchAllProducts.rejected, (state) => {
        state.Loading = false;
        state.error = true;
      });
  },
});

export const { addToCart, Remove , increaseQuantity , decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;