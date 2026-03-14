import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartService from "../../services/cart.service";

const loadFromStorage = () => {
    try {
        const serializedState = localStorage.getItem('cartItems');
        if (serializedState === null) return [];
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load cart from local storage", e);
        return [];
    }
};

const initialState = {
    items: loadFromStorage(),
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    status: 'idle', // idle, loading, succeeded, failed
    error: null
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, thunkAPI) => {
    try {
        const response = await CartService.getCart();
        return response.data;
    } catch (err) {
        const errorData = err.response?.data || { message: err.message };
        return thunkAPI.rejectWithValue(errorData);
    }
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity, size, color }, thunkAPI) => {
    try {
        await CartService.addToCart(productId, quantity, size, color);
        // After adding, fetch cart again and wait for it to complete
        const fetchResult = await thunkAPI.dispatch(fetchCart());
        // Return the fetched cart data so we can update state properly
        return fetchResult.payload || { productId, quantity, size, color };
    } catch (err) {
        const errorData = err.response?.data || { message: err.message };
        return thunkAPI.rejectWithValue(errorData);
    }
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, size = '', color = '' }, thunkAPI) => {
    try {
        await CartService.removeFromCart(productId, size, color);
        // Fetch updated cart and return the result
        const fetchResult = await thunkAPI.dispatch(fetchCart());
        return fetchResult.payload;
    } catch (err) {
        const errorData = err.response?.data || { message: err.message };
        return thunkAPI.rejectWithValue(errorData);
    }
})



export const syncCart = createAsyncThunk('cart/syncCart', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const items = state.cart.items.map(item => ({
            productId: item.id,
            quantity: item.CartItem.quantity,
            size: item.CartItem.size,
            color: item.CartItem.color
        }));
        await CartService.syncCart(items);
        return items;
    } catch (err) {
        const errorData = err.response?.data || { message: err.message };
        return thunkAPI.rejectWithValue(errorData);
    }
});

export const updateItemQuantityAsync = createAsyncThunk('cart/updateItemQuantityAsync', async ({ productId, quantity, size = '', color = '' }, thunkAPI) => {
    try {
        await CartService.updateCartItem(productId, quantity, size, color);
        // Fetch updated cart
        const fetchResult = await thunkAPI.dispatch(fetchCart());
        return fetchResult.payload;
    } catch (err) {
        const errorData = err.response?.data || { message: err.message };
        return thunkAPI.rejectWithValue(errorData);
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart(state) {
            state.items = [];
            state.cartTotalQuantity = 0;
            state.cartTotalAmount = 0;
        },
        updateItemQuantity(state, action) {
            const { productId, quantity, size = '', color = '' } = action.payload;
            const existingItem = state.items.find(item => item.id === productId && item.CartItem.size === size && item.CartItem.color === color);
            if (existingItem) {
                existingItem.CartItem.quantity = quantity;
                state.cartTotalQuantity = state.items.reduce((acc, item) => acc + item.CartItem.quantity, 0);
                state.cartTotalAmount = state.items.reduce((acc, item) => acc + (item.price * item.CartItem.quantity), 0);
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Backend returns: { success: true, data: { id, userId, items: [ { id, quantity, product: { ... } } ] } }
                if (action.payload && action.payload.data && action.payload.data.items) {
                    // Map the backend structure to what the frontend components expect:
                    // Frontend expects `item` to have Product fields directly and `CartItem` for association data
                    state.items = action.payload.data.items.map(cartItem => ({
                        ...cartItem.product,
                        CartItem: {
                            quantity: cartItem.quantity,
                            size: cartItem.size || '', // assuming size/color might be added later to backend
                            color: cartItem.color || ''
                        }
                    }));
                    state.cartTotalQuantity = state.items.reduce((acc, item) => acc + item.CartItem.quantity, 0);
                    state.cartTotalAmount = state.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.CartItem.quantity), 0);
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                } else {
                    state.items = [];
                }
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addToCart.pending, (state) => {
                // state.status = 'loading'; // Avoid flickering
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // fetchCart is dispatched inside addToCart, so payload here is the fetchCart result
                if (action.payload && action.payload.data && action.payload.data.items) {
                    state.items = action.payload.data.items.map(cartItem => ({
                        ...cartItem.product,
                        CartItem: {
                            quantity: cartItem.quantity,
                            size: cartItem.size || '',
                            color: cartItem.color || ''
                        }
                    }));
                    state.cartTotalQuantity = state.items.reduce((acc, item) => acc + item.CartItem.quantity, 0);
                    state.cartTotalAmount = state.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.CartItem.quantity), 0);
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                }
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(removeFromCart.pending, (state) => {
                // state.status = 'loading'; // Avoid flickering
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload.data && action.payload.data.items) {
                    state.items = action.payload.data.items.map(cartItem => ({
                        ...cartItem.product,
                        CartItem: {
                            quantity: cartItem.quantity,
                            size: cartItem.size || '',
                            color: cartItem.color || ''
                        }
                    }));
                    state.cartTotalQuantity = state.items.reduce((acc, item) => acc + item.CartItem.quantity, 0);
                    state.cartTotalAmount = state.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.CartItem.quantity), 0);
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                }
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateItemQuantityAsync.pending, (state) => {
                // state.status = 'loading'; // Avoid flickering
            })
            .addCase(updateItemQuantityAsync.fulfilled, (state, action) => {
                state.status = 'succeeded';
                if (action.payload && action.payload.data && action.payload.data.items) {
                    state.items = action.payload.data.items.map(cartItem => ({
                        ...cartItem.product,
                        CartItem: {
                            quantity: cartItem.quantity,
                            size: cartItem.size || '',
                            color: cartItem.color || ''
                        }
                    }));
                    state.cartTotalQuantity = state.items.reduce((acc, item) => acc + item.CartItem.quantity, 0);
                    state.cartTotalAmount = state.items.reduce((acc, item) => acc + (parseFloat(item.price) * item.CartItem.quantity), 0);
                    localStorage.setItem('cartItems', JSON.stringify(state.items));
                }
            })
            .addCase(updateItemQuantityAsync.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })


    },
});

export const { clearCart, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
