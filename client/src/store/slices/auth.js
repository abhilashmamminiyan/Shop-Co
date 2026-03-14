import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
    ? { isLoggedIn: true, user: user.user || user, token: user.token || null, roles: user.roles || (user.user && user.user.roles) || [] }
    : { isLoggedIn: false, user: null, token: null, roles: [] };

export const register = createAsyncThunk(
    "auth/register",
    async (userData, thunkAPI) => {
        try {
            const response = await AuthService.register(userData);
            return response.data;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, thunkAPI) => {
        try {
            const data = await AuthService.login(email, password);
            return data; // Return the data directly, it already has user and token
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const logout = createAsyncThunk("auth/logout", async () => {
    AuthService.logout();
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                // Don't automatically log in after registration
                // User should login manually after signing up
                state.isLoggedIn = false;
                state.user = null;
                state.roles = [];
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.roles = [];
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                const userData = action.payload.user || action.payload;
                state.user = userData;
                state.token = action.payload.token;
                state.roles = userData.roles || [];
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.roles = [];
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.user = null;
                state.token = null;
                state.roles = [];
            });
    },
});

export default authSlice.reducer;
