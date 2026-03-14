const { Order, OrderItem, Product } = require("../models/models");

const createOrder = async (userId, total, subtotal, discount, deliveryFee, items) => {
    const order = await Order.create({
        userId,
        total,
        subtotal,
        discount,
        deliveryFee,
        status: 'pending'
    });

    for (const item of items) {
        await OrderItem.create({
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            size: item.size,
            color: item.color
        });
    }

    return order;
};

const getOrdersByUserId = async (userId) => {
    return await Order.findAll({
        where: { userId },
        include: [
            {
                model: OrderItem,
                as: 'items',
                include: [{ model: Product, as: 'product' }]
            }
        ],
        order: [['createdAt', 'DESC']]
    });
};

const getOrderById = async (orderId) => {
    return await Order.findByPk(orderId, {
        include: [
            {
                model: OrderItem,
                as: 'items',
                include: [{ model: Product, as: 'product' }]
            }
        ]
    });
};

module.exports = {
    createOrder,
    getOrdersByUserId,
    getOrderById
};
