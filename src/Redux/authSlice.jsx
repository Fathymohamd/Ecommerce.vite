import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://ecommerce-vite-two.vercel.app/api/auth/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getMe.fulfilled, (state, action) => {
         console.log("GET ME AFTER REFRESH:", action.payload);
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      .addCase(getMe.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;


        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const {
  setUser,
  logout,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;