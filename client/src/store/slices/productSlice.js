import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import ProductService from "../../services/productService";

const initialState = {
  list: [],
  filtered: [],
  status: 'idle',
  error: null,
  currentProduct: null
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
  try {
    const response = await ProductService.getAllProducts();
    return response.data; // Assuming API returns array or { data: [] }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const fetchProductById = createAsyncThunk('products/fetchProductById', async (id, thunkAPI) => {
  try {
    const response = await ProductService.getProductById(id);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createProduct = createAsyncThunk('products/createProduct', async (productData, thunkAPI) => {
  try {
    const response = await ProductService.createProduct(productData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateProduct = createAsyncThunk('products/updateProduct', async ({ id, data }, thunkAPI) => {
  try {
    const response = await ProductService.updateProduct(id, data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  try {
    await ProductService.deleteProduct(id);
    return id; // Return ID to remove from state
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilteredProducts(state, action) {
      state.filtered = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = Array.isArray(action.payload) ? action.payload : action.payload.data || [];
        state.filtered = state.list;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      // Create Product
      .addCase(createProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
      })
      // Update Product
      .addCase(updateProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
      })
      // Delete Product
      .addCase(deleteProduct.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.list = state.list.filter(p => p.id !== action.payload);
          state.filtered = state.list;
      });
  }
});

export const { setFilteredProducts } = productSlice.actions;

// Selector to filter products based on applied filters
export const selectFilteredProducts = createSelector(
  [(state) => state.products.list, (state) => state.filters.applied],
  (products, filters) => {
    return products.filter(product => {
      // Category Filter
      if (filters.category && product.categoryId !== filters.category) return false;

      // Type Filter
      if (filters.type && product.type !== filters.type) return false;

      // Price Filter
      if (product.price < filters.price[0] || product.price > filters.price[1]) return false;

      // Color Filter
      if (filters.colors && filters.colors.length > 0) {
        if (!product.colors || !product.colors.some(c => filters.colors.includes(c))) return false;
      }

      // Size Filter
      if (filters.sizes && filters.sizes.length > 0) {
        if (!product.sizes || !product.sizes.some(s => filters.sizes.includes(s))) return false;
      }

      return true;
    });
  }
);

export default productSlice.reducer;
