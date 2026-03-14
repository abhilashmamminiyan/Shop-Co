const asyncHandler = require('../middlewares/asyncHandler');
const orderRepository = require('../repositories/order.repository');
const cartRepository = require('../repositories/cart.repository');

const createOrder = asyncHandler(async (req, res) => {
    let { total, subtotal, discount, deliveryFee, items } = req.body;

    if (!items || items.length === 0 || !total) {
        const cart = await cartRepository.getCartByUserId(req.userId);
        if (!cart || !cart.items || cart.items.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }
        
        items = cart.items.map(cartItem => ({
            productId: cartItem.product.id,
            quantity: cartItem.quantity,
            price: cartItem.product.price,
            size: cartItem.size,
            color: cartItem.color
        }));
        
        subtotal = items.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
        discount = subtotal * 0.20;
        deliveryFee = 15;
        total = subtotal - discount + deliveryFee;
    }

    const order = await orderRepository.createOrder(req.userId, total, subtotal, discount, deliveryFee, items);
    
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
