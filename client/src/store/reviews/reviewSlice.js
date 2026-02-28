import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import reviewService from "../../services/reviewService";

const initialState = {
    reviews: [],
    loading: false,
    error: null,
    addReviewStatus: 'idle', // idle, loading, succeeded, failed
};

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (productId, thunkAPI) => {
    try {
        const response = await reviewService.getReviews(productId);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

export const addReview = createAsyncThunk('reviews/addReview', async ({ productId, reviewData }, thunkAPI) => {
    try {
        const response = await reviewService.addReview(productId, reviewData);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});

const reviewSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        resetAddReviewStatus: (state) => {
            state.addReviewStatus = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(addReview.pending, (state) => {
                state.addReviewStatus = 'loading';
            })
            .addCase(addReview.fulfilled, (state, action) => {
                state.addReviewStatus = 'succeeded';
                state.reviews.unshift(action.payload); // Add new review to the top
            })
            .addCase(addReview.rejected, (state, action) => {
                state.addReviewStatus = 'failed';
                state.error = action.payload;
            });
    },
});

export const { resetAddReviewStatus } = reviewSlice.actions;
export default reviewSlice.reducer;
