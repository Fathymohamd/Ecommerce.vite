import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const Notifications = createAsyncThunk(
"push/Notifications",
async(checkbox , { rejectWithValue })=>{
try {
    const res = await fetch("https://ecommerce-vite-black.vercel.app/api/users/Notifications" , {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
        checkbox
        }),
})

const data = await res.json()

if (!res.ok) {
return rejectWithValue(data.message);
}
return data
}catch(error){
return rejectWithValue(error.message);
}
}
)


const initialState = {
  notifications :true,
  loading: false,
  error: null,
};


const PushNotifications = createSlice({
    name:"checkbox",
    initialState,
    reducers:{},
extraReducers : (builder) =>{
builder
      .addCase(Notifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

.addCase(Notifications.fulfilled, (state, action) => {
  state.loading = false;
  state.notifications = action.payload.user.notifications;
})

.addCase(Notifications.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})


}
})

export default PushNotifications.reducer;