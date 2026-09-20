import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const updateProfile = createAsyncThunk(
  "auth/updateProfile",

  async ({ name, email }, thunkAPI) => {
    try {
      const response = await fetch(
        "https://ecommerce-vite-black.vercel.app/api/users/profile",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.user;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




export const changePassword = createAsyncThunk(
  "auth/changePassword",

  async (
    {
      password,
      newPassword,
      confirmPassword,
    },
    thunkAPI
  ) => {
    try {
      const response = await fetch(
        "https://ecommerce-vite-black.vercel.app/api/users/password",
        {
          method: "PATCH",
         
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            password,
            newPassword,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);




const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    loading: false,
    error: null,
    errorPassword : null
  },

  reducers: {},

  extraReducers: (builder) => {

    builder



      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;

    
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


   
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.errorPassword = null;
      })

      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.errorPassword = action.payload;
      });
  },
});

export default authSlice.reducer;