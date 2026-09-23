import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateProfile = createAsyncThunk(
  "settings/updateProfile",
  async (
    { name, email, phone, address },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(
        "https://ecommerce-vite-two.vercel.app/api/users/UPprofile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name,
            email,
            phone,
            address,
          }),
        }
      );

      const data = await response.json();

      console.log("UPDATE PROFILE RESPONSE:", data);

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const settingsSlice = createSlice({
  name: "profile",

  initialState: {
    loading: false,
    error: null,
    errorPassword: null,
    user: null,
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
        state.error = null;
        state.user = action.payload;
      })

      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


  },
});

export default settingsSlice.reducer;