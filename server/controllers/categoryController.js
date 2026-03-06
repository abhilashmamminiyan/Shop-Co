const asyncHandler = require('../middlewares/asyncHandler');
const categoryRepository = require('../repositories/categoryRepository');
const categories = require('../seederData/category');

const getAllCategories = asyncHandler(async(req, res, next) => {
    const categories = await categoryRepository.getAllCategories();
    res.status(200).json({
        message:'categories fetched successfully', 
        data:categories,
        success: true
    });
});

const getCategoryById = asyncHandler(async(req, res, next) => {
    const category = await categoryRepository.getCategoryById(req.params.id);
    res.status(200).json({message: `category fetched with Id: ${req.params.id}`, category});
});

const seedCategories = asyncHandler(async(req, res, next) => {
    const createdCategories = await categoryRepository.createCategories(categories);
    res.status(201).json({message: 'categories seeded successfully', data:createdCategories});
});

module.exports = {
    getAllCategories,
    getCategoryById,
    seedCategories
}
