import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const updateSettings = createAsyncThunk(
  "settings/updateSettings",
  async (settingsData, thunkAPI) => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/settings",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(settingsData),
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

export const getSettings = createAsyncThunk(
  "settings/getSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:8080/settings"
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

const settingsSlice = createSlice({
  name: "settings",

  initialState: {
    setting: null,
    loading: false,
    errors: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // GET SETTINGS
      .addCase(getSettings.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })

      .addCase(getSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload.settings || null;
      })

      .addCase(getSettings.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })

      
      .addCase(updateSettings.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })

      .addCase(updateSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.setting = action.payload.settings || null;
      })

      .addCase(updateSettings.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  },
});

export default settingsSlice.reducer;