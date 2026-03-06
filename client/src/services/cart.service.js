import api from './api';

const API_URL = '/cart/';

const getAuthHeader = () => {
    const userData = localStorage.getItem('user');
    let token = null;

    if (userData) {
        const user = JSON.parse(userData);
        token = user.token || user.accessToken || user.user?.token;
    }

    // Always include guest ID to allow merging
    let guestId = localStorage.getItem('guestId');
    if (!guestId) {
       guestId = crypto.randomUUID();
       localStorage.setItem('guestId', guestId);
    }

    const headers = { 'x-guest-id': guestId };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
};

const getCart = () => {
    return api.get(API_URL, {
        headers: getAuthHeader(),
    });
};

const addToCart = (productId, quantity, size, color) => {
    return api.post(API_URL, { productId, quantity, size, color }, {
        headers: getAuthHeader(),
    });
};

const removeFromCart = (productId, size = '', color = '') => {
    const sizeParam = size ? `size=${encodeURIComponent(size)}` : '';
    const colorParam = color ? `color=${encodeURIComponent(color)}` : '';
    const query = [sizeParam, colorParam].filter(Boolean).join('&');
    
    return api.delete(API_URL + productId + (query ? `?${query}` : ''), {
        headers: getAuthHeader(),
    });
}

const updateCartItem = (productId, quantity, size = '', color = '') => {
    return api.put(API_URL, { productId, quantity, size, color }, {
        headers: getAuthHeader(),
    });
};

const syncCart = (items) => {
    return api.put(API_URL + 'sync', { items }, {
        headers: getAuthHeader(),
    });
};

const cartService = {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItem,
    syncCart,
};

export default cartService;
