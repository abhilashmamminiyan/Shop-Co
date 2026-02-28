import axios from 'axios';

const API_URL = 'http://localhost:4000/api/orders/';

const getUserOrders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
};

const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.post(API_URL, {}, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
}

const getAllOrders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
};

const updateOrderStatus = (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.put(API_URL + id + '/status', { status }, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
};

const orderService = {
    getUserOrders,
    placeOrder,
    getAllOrders,
    updateOrderStatus
};

export default orderService;
