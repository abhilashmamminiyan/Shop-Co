import api from './api';

const register = (userData) => {
    return api.post('/auth/register', userData);
};

const login = (email, password) => {
    return api
        .post('/auth/login', {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout,
};

export default authService;
