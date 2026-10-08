
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk(
  "auth/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/userget",
        {
              method: "GET",
           credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
  
    try {

      const response = await fetch(
        `http://localhost:8080/userDelete/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message);
      }

      return data;

    } catch (error) {
    
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: null,
  users: [],
  isAuthenticated: false,
  loading: false,
  error: null,
};

const getUser = createSlice({
  name: "Get",

  initialState,

  reducers: {
userDelete: (state, action) => {
   const  deleteUsers = action.payload;
  state.users = state.users.filter(
    (user) => user._id !== deleteUsers._id
  );
}
  },

  extraReducers: (builder) => {
    builder

    .addCase(getUsers.pending, (state) => {
  state.loading = true;
  state.error = null;
})



.addCase(getUsers.fulfilled, (state, action) => {
  state.loading = false;
  state.users = action.payload;
})

.addCase(getUsers.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
})


.addCase(deleteUser.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(deleteUser.fulfilled, (state, action) => {
  state.loading = false;

  state.users = state.users.filter(
    (user) => user._id !== action.meta.arg
  );
})

.addCase(deleteUser.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload || action.error.message;
})

  },
});

export const {userDelete} = getUser.actions;
export default getUser.reducer;