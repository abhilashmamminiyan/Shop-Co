import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products?category=${categoryId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
