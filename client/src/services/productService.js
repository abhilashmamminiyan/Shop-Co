import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/products/';
const ADMIN_API_URL = 'http://localhost:4000/api/admin/products/';

const getAllProducts = () => {
    return axios.get(API_URL);
};

const getProductById = (id) => {
    return axios.get(API_URL + id);
};

const createProduct = (productData) => {
    return axios.post(ADMIN_API_URL, productData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
};

const updateProduct = (id, productData) => {
    let headers = authHeader();
    if (productData instanceof FormData) {
        headers = { ...headers, 'Content-Type': 'multipart/form-data' };
    }
    return axios.put(ADMIN_API_URL + id, productData, { headers });
};

const deleteProduct = (id) => {
    return axios.delete(ADMIN_API_URL + id, { headers: authHeader() });
};

const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productService;