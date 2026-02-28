import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "../../services/order.service";

const initialState = {
    orders: [],
    adminOrders: [],
    status: 'idle',
    error: null
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
    try {
        const response = await OrderService.getUserOrders();
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const fetchAllOrders = createAsyncThunk('orders/fetchAllOrders', async (_, thunkAPI) => {
    try {
        const response = await OrderService.getAllOrders();
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const placeOrder = createAsyncThunk('orders/placeOrder', async (_, thunkAPI) => {
    try {
        const response = await OrderService.placeOrder();
        return response.data;
    } catch (err) {
        const errorData = err.response?.data || { message: 'Order placement failed' };
        return thunkAPI.rejectWithValue(errorData);
    }
});



export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ id, status }, thunkAPI) => {
    try {
        const response = await OrderService.updateOrderStatus(id, status);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(placeOrder.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally append new order if returned
                // state.orders.unshift(action.payload);
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Admin: Fetch All Orders
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminOrders = action.payload;
            })
            // Admin: Update Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if(state.adminOrders) {
                     const index = state.adminOrders.findIndex(o => o.id === action.payload.id);
                     if(index !== -1) {
                         state.adminOrders[index] = action.payload; 
                     } else {
                         // Fallback re-fetch or manual update if payload structure differs
                         // For now, assuming payload is the updated order object
                     }
                }
            });
    },
});

export default orderSlice.reducer;
