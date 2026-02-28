import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/products/';

const getReviews = (productId) => {
    return axios.get(API_URL + productId + '/reviews');
};

const addReview = (productId, reviewData) => {
    return axios.post(API_URL + productId + '/reviews', reviewData, { headers: authHeader() });
};

const reviewService = {
    getReviews,
    addReview
};

export default reviewService;
