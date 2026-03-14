const asyncHandler = require('../middlewares/asyncHandler');
const productRepository = require('../repositories/product.repository');
const products = require('../seederData/products');

const getAllProducts = asyncHandler(async(req, res, next) => {
    const { category, search } = req.query;
    let products;
    if (category || search) {
        // This would ideally be handled in the repository, but adding here for quick improvement
        const allProducts = await productRepository.getAllProducts();
        products = allProducts.filter(p => {
            let match = true;
            if (category && p.categoryId !== category) match = false;
            if (search && !p.name.toLowerCase().includes(search.toLowerCase())) match = false;
            return match;
        });
    } else {
        products = await productRepository.getAllProducts();
    }
    res.status(200).json({message:'products fetched successfully', data: products});
});

const getProductById = asyncHandler(async(req, res, next) => {
    const product = await productRepository.getProductById(req.params.id);
    res.status(200).json({message: `product fetched with Id: ${req.params.id}`, data: product});
});

const seedProduct = asyncHandler(async(req, res, next) => {
    const createdProducts = await productRepository.createProducts(products);
    res.status(201).json({message: `product seeded successfully`, createdProducts});
});

module.exports = {
    getAllProducts,
    getProductById,
    seedProduct
}