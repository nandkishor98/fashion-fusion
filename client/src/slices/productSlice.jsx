import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProduct, list } from "../services/products";

const initialState = {
  currentPage: 1,
  error: "",
  loading: false,
  products: [],
  product: {},
  limit: 20,
  total: 0,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ limit, page }) => {
    const resp = await list(limit, page);
    return resp.data;
  }
);

export const getById = createAsyncThunk("products/getById", async (id) => {
  const resp = await getProduct(id);
  return resp.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimit: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.total = action.payload.data.total;
        state.products = action.payload.data.data;
      })
      .addCase(fetchProducts.pending, (state) => {
        // Add user to the state array
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getById.fulfilled, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.product = action.payload.data;
      })
      .addCase(getById.pending, (state) => {
        // Add user to the state array
        state.loading = true;
      })
      .addCase(getById.rejected, (state, action) => {
        // Add user to the state array
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentPage, setLimit } = productSlice.actions;

export const productReducer = productSlice.reducer;