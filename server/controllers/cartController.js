const asyncHandler = require('../middlewares/asyncHandler');
const cartRepository = require('../repositories/cart.repository');

const getCart = asyncHandler(async (req, res) => {
    const cart = await cartRepository.getCartByUserId(req.userId);
    res.status(200).json({ success: true, data: cart });
});

const addToCart = asyncHandler(async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    const cartItem = await cartRepository.addItemToCart(req.userId, productId, quantity || 1, size, color);
    res.status(200).json({ success: true, data: cartItem });
});

const updateCartItem = asyncHandler(async (req, res) => {
    const { productId, quantity, size, color } = req.body;
    try {
        const cartItem = await cartRepository.updateItemQuantity(req.userId, productId, quantity, size, color);
        res.status(200).json({ success: true, data: cartItem });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
});

const removeCartItem = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    await cartRepository.removeItemFromCart(req.userId, productId);
    res.status(200).json({ success: true, message: 'Item removed from cart' });
});

const clearCart = asyncHandler(async (req, res) => {
    await cartRepository.clearCart(req.userId);
    res.status(200).json({ success: true, message: 'Cart cleared' });
});

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
};
