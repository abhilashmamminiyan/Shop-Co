const { Cart, CartItem, Product } = require("../models/models");

const getCartByUserId = async (userId) => {
    console.log('Fetching cart for userId:', userId);
    let cart = await Cart.findOne({
        where: { userId },
        include: [
            {
                model: CartItem,
                as: 'items',
                include: [{ model: Product, as: 'product' }]
            }
        ]
    });
    
    if (!cart) {
        cart = await Cart.create({ userId });
        cart.items = [];
    }
    
    return cart;
};

const addItemToCart = async (userId, productId, quantity, size, color) => {
    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
        console.log('Creating new cart for userId:', userId);
        cart = await Cart.create({ userId });
    }

    let cartItem = await CartItem.findOne({
        where: { cartId: cart.id, productId, size, color }
    });

    if (cartItem) {
        cartItem.quantity += parseInt(quantity);
        await cartItem.save();
    } else {
        cartItem = await CartItem.create({
            cartId: cart.id,
            productId,
            quantity,
            size,
            color
        });
    }

    return cartItem;
};

const updateItemQuantity = async (userId, productId, quantity, size, color) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) throw new Error('Cart not found');
    const cartItem = await CartItem.findOne({ where: { cartId: cart.id, productId, size, color } });
    if (!cartItem) throw new Error('Item not found in cart');
    cartItem.quantity = parseInt(quantity);
    await cartItem.save();
    return cartItem;
};

const removeItemFromCart = async (userId, productId) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (cart) {
        await CartItem.destroy({ where: { cartId: cart.id, productId } });
    }
};

const clearCart = async (userId) => {
    const cart = await Cart.findOne({ where: { userId } });
    if (cart) {
        await CartItem.destroy({ where: { cartId: cart.id } });
    }
};

module.exports = {
    getCartByUserId,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart
};
