import api from './api';

const API_URL = '/orders/';

const getUserOrders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return api.get(API_URL, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
};

const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return api.post(API_URL, {}, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
}

const getAllOrders = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return api.get(API_URL, {
        headers: { Authorization: `Bearer ${user?.token}` },
    });
};

const updateOrderStatus = (id, status) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return api.put(API_URL + id + '/status', { status }, {
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
