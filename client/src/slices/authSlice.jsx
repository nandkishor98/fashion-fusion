import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "../services/auth";
import { setToken } from "../utils/session";

const initialState = {
  user: {},
  isLoggedIn: false,
  roles: [],
  error: "",
  loading: false,
};

export const loginByEmail = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const resp = await login({ email, password });
      return resp.data;
    } catch (err) {
      if (!err.response) {
        throw err;
      }

      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsloggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setLogOut: (state) => {
      state.user = {};
      state.roles = [];
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginByEmail.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.data.user;
        setToken(action.payload.data.token);
        state.roles.push(...action.payload.data.user.roles);
      })
      .addCase(loginByEmail.pending, (state) => {
        // Add user to the state array
        state.loading = true;
      })
      .addCase(loginByEmail.rejected, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.error = action.payload.msg || action.error.message;
      });
  },
});

export const { setIsloggedIn, setLogOut } = authSlice.actions;

export const authReducer = authSlice.reducer;