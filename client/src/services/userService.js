import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:4000/api/users/';

const getAllUsers = () => {
    return axios.get(API_URL, { headers: authHeader() });
};

const userService = {
    getAllUsers
};

export default userService;
