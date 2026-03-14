const router = require('express').Router();
const { getCart, addToCart, clearCart, updateCartItem, removeCartItem } = require('../controllers/cartController');
const { verifyTokenHandler } = require('../middlewares/jwtHandler');

router.get('/', verifyTokenHandler, getCart);
router.post('/', verifyTokenHandler, addToCart);
router.patch('/', verifyTokenHandler, updateCartItem);
router.delete('/:productId', verifyTokenHandler, removeCartItem);
router.delete('/', verifyTokenHandler, clearCart);

module.exports = router;
