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
                const rawOrders = action.payload.data || action.payload || [];
                state.orders = rawOrders.map(order => ({
                    ...order,
                    totalAmount: order.total,
                    subtotal: order.subtotal,
                    discount: order.discount,
                    deliveryFee: order.deliveryFee,
                    Products: (order.items || []).map(item => ({
                        ...item.product,
                        OrderItem: {
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size,
                            color: item.color
                        }
                    }))
                }));
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
            })
            .addCase(placeOrder.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Admin: Fetch All Orders
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const rawOrders = action.payload.data || action.payload || [];
                state.adminOrders = rawOrders.map(order => ({
                    ...order,
                    totalAmount: order.total,
                    subtotal: order.subtotal,
                    discount: order.discount,
                    deliveryFee: order.deliveryFee,
                    Products: (order.items || []).map(item => ({
                        ...item.product,
                        OrderItem: {
                            quantity: item.quantity,
                            price: item.price,
                            size: item.size,
                            color: item.color
                        }
                    }))
                }));
            })
            // Admin: Update Status
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedOrderRaw = action.payload.data || action.payload;
                if(state.adminOrders && updatedOrderRaw) {
                     const updatedOrder = {
                        ...updatedOrderRaw,
                        totalAmount: updatedOrderRaw.total,
                        subtotal: updatedOrderRaw.subtotal,
                        discount: updatedOrderRaw.discount,
                        deliveryFee: updatedOrderRaw.deliveryFee,
                        Products: (updatedOrderRaw.items || []).map(item => ({
                            ...item.product,
                            OrderItem: {
                                quantity: item.quantity,
                                price: item.price,
                                size: item.size,
                                color: item.color
                            }
                        }))
                     };
                     const index = state.adminOrders.findIndex(o => o.id === updatedOrder.id);
                     if(index !== -1) {
                         state.adminOrders[index] = updatedOrder; 
                     }
                }
            });
    },
});

export default orderSlice.reducer;
