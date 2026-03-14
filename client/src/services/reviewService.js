import api from './api';
import authHeader from './auth-header';

const API_URL = '/products/';

const getReviews = (productId) => {
    return api.get(`${API_URL}/${productId}/reviews`);
};

const addReview = (productId, reviewData) => {
    return api.post(`${API_URL}/${productId}/reviews`, reviewData, { headers: authHeader() });
};

const reviewService = {
    getReviews,
    addReview
};

export default reviewService;
