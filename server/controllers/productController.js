const asyncHandler = require('../middlewares/asyncHandler');

const getAllProducts = asyncHandler(async(req, res) => {
    res.status(200).json({message:'products fetched successfully'});
});

const getProductById = asyncHandler(async(req, res) => {
    res.status(200).json({message: `product fetched with Id: ${req.params.id}`})
});

module.exports = {
    getAllProducts,
    getProductById
}