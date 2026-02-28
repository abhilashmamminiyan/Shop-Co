import { createAsyncThunk } from "@reduxjs/toolkit";
import CategoryService from "../../services/categoryService";

export const fetchCategories = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getAllCategories();
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await CategoryService.getCategoryById(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createCategory = createAsyncThunk('category/createCategory', async (categoryData, thunkAPI) => {
  try {
    const response = await CategoryService.createCategory(categoryData);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateCategory = createAsyncThunk('category/updateCategory', async ({ id, data }, thunkAPI) => {
  try {
    const response = await CategoryService.updateCategory(id, data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (id, thunkAPI) => {
  try {
    await CategoryService.deleteCategory(id);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});
