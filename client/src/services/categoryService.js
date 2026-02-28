import axios from 'axios';
// import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/categories/';

const getAllCategories = () => {
    return axios.get(API_URL);
};

const getCategoryById = (id) => {
    return axios.get(API_URL + id);
};

// const createCategory = (categoryData) => {
//     return axios.post(API_URL, categoryData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
// };

// const deleteCategory = (id) => {
//     return axios.delete(API_URL + id, { headers: authHeader() });
// };

// const updateCategory = (id, categoryData) => {
//     return axios.put(API_URL + id, categoryData, { headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' } });
// };

const categoryService = {
    getAllCategories,
    getCategoryById,
    // createCategory,
    // updateCategory,
    // deleteCategory
};

export default categoryService;