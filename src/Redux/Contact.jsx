import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createContact = createAsyncThunk(
  "contact/createContact",

  async (formData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      // لو Backend رجع Error
      if (!response.ok) {
        return rejectWithValue(
          data.message || "Something went wrong"
        );
      }

    
      return data;

    } catch (error) {
      return rejectWithValue(
        "Unable to connect to server"
      );
    }
  }
);




const contactSlice = createSlice({
  name: "contact",

  initialState: {
    loading: false,
    success: false,
    message: "",
    error: null,
  },

  reducers: {
    clearContactState: (state) => {
      state.loading = false;
      state.success = false;
      state.message = "";
      state.error = null;
    },
  },

  extraReducers: (builder) => {

    builder
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.message = "";
        state.error = null;
      })




      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.message = action.payload.message;
        state.error = null;
      })



      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Something went wrong";
      });
  },
});




export const {
  clearContactState,
} = contactSlice.actions;

export default contactSlice.reducer;