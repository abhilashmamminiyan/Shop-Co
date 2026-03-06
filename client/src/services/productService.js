import api from './api';
import authHeader from './auth-header';

const API_URL = '/products';
const ADMIN_API_URL = '/admin/products';

const getAllProducts = () => {
    return api.get(API_URL);
};

const getProductById = (id) => {
    return api.get(API_URL + '/' + id);
};

const createProduct = (productData) => {
    return api.post(ADMIN_API_URL, productData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
};

const updateProduct = (id, productData) => {
    let headers = authHeader();
    if (productData instanceof FormData) {
        headers = { ...headers, 'Content-Type': 'multipart/form-data' };
    }
    return api.put(ADMIN_API_URL + '/' + id, productData, { headers });
};

const deleteProduct = (id) => {
    return api.delete(ADMIN_API_URL + '/' + id, { headers: authHeader() });
};

const productService = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

export default productService;