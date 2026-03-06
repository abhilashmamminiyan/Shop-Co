const asyncHandler = require('../middlewares/asyncHandler');
const orderRepository = require('../repositories/order.repository');
const cartRepository = require('../repositories/cart.repository');

const createOrder = asyncHandler(async (req, res) => {
    const { total, items } = req.body;
    const order = await orderRepository.createOrder(req.userId, total, items);
    
    // Clear cart after order
    await cartRepository.clearCart(req.userId);
    
    res.status(201).json({ success: true, data: order });
});

const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await orderRepository.getOrdersByUserId(req.userId);
    res.status(200).json({ success: true, data: orders });
});

const getOrderById = asyncHandler(async (req, res) => {
    const order = await orderRepository.getOrderById(req.params.id);
    if (!order || order.userId !== req.userId) {
        return res.status(404).json({ success: false, message: 'Order not found' });
    }
    res.status(200).json({ success: true, data: order });
});

module.exports = {
    createOrder,
    getUserOrders,
    getOrderById
};
