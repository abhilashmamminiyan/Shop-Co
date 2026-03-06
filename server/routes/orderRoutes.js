const router = require('express').Router();
const { createOrder, getUserOrders, getOrderById } = require('../controllers/orderController');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');

router.get('/', verifyTokenHandler, getUserOrders);
router.get('/:id', verifyTokenHandler, getOrderById);
router.post('/', verifyTokenHandler, createOrder);

module.exports = router;
