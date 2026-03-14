import api from './api';
import authHeader from './auth-header';

const API_URL = '/users/';

const getAllUsers = () => {
    return api.get(API_URL, { headers: authHeader() });
};

const userService = {
    getAllUsers
};

export default userService;
