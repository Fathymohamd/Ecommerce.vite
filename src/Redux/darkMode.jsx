import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const updateDarkMode = createAsyncThunk(
  "darkMode/update",
  async (darkMode, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/api/users/DarkMode",
        {
          method: "PATCH",
           credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        
          body: JSON.stringify({
            darkMode,
          }),
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



export const getDarkMode = createAsyncThunk(
  "darkMode/getDarkMode",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(
        "https://ecommerce-vite-two.vercel.app/api/users/darkMode",
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


const initialState = {
  darkMode: false,
  loading: false,
  error: null,
};


const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,

  reducers: {},

  extraReducers: (builder) => {

    // UPDATE

    builder
      .addCase(updateDarkMode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateDarkMode.fulfilled, (state, action) => {
        state.loading = false;

        state.darkMode =
          action.payload.user.darkMode;
      })

      .addCase(updateDarkMode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // GET

    builder
      .addCase(getDarkMode.pending, (state) => {
        state.loading = true;
      })

      .addCase(getDarkMode.fulfilled, (state, action) => {
      state.loading = false;
      state.initialized = true;
      state.darkMode = action.payload.user.darkMode;
     })

      .addCase(getDarkMode.rejected, (state, action) => {
  state.loading = false;
  state.initialized = true;
  state.error = action.payload;
})

  },
});


export default darkModeSlice.reducer;