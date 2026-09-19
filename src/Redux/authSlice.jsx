import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getMe  = createAsyncThunk(
   "auth/getMe" , async()=>{
    try {
   const response = await fetch(
        "http://localhost:8080/api/auth/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data.user;
    }catch(error){
        console.log(error)
    }
})

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
  extraReducers:(builder)=>{
    builder
    .addCase(getMe.pending , (state)=>{
      state.loading = true;
      state.error = null;
    })
.addCase(getMe.fulfilled, (state, action) => {
  state.loading = false;
  state.user = action.payload;
  state.isAuthenticated = true;
})
      .addCase(getMe.rejected , (state)=>{
      state.loading = false;
      state.error = action.error.message;
    })
  }
});

export const {
  setUser,
  logout,
  setLoading,
  setError,

} = authSlice.actions;

export default authSlice.reducer;