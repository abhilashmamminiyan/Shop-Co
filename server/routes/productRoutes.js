const router = require('express').Router();
const { getAllProducts, getProductById, seedProduct } = require('../controllers/productController')

router.get('/', getAllProducts);
router.get('/:id', getProductById)
router.post('/seed', seedProduct)

module.exports = router;