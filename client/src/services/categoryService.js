import api from './api';
import authHeader from './auth-header';

const API_URL = '/categories';

const getAllCategories = () => {
    return api.get(API_URL);
};

const getCategoryById = (id) => {
    return api.get(`${API_URL}/${id}`);
};

const createCategory = (categoryData) => {
    return api.post(API_URL, categoryData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
};

const deleteCategory = (id) => {
    return api.delete(`${API_URL}/${id}`, { headers: authHeader() });
};

const updateCategory = (id, categoryData) => {
    return api.put(`${API_URL}/${id}`, categoryData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
};

const categoryService = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryService;