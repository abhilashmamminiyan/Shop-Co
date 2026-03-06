const { Category } = require("../models/models");

const getAllCategories = async () => {
    return new Promise((resolve, reject) => {
        Category.findAll({
            order: [['sortOrder', 'ASC']]
        }).then((categories) => {
            resolve(categories);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getCategoryById = async (id) => {
    return new Promise((resolve, reject) => {
        Category.findByPk(id).then((category) => {
            resolve(category);
        }).catch((error) => {
            reject(error);
        });
    });
};

const createCategories = async (categories) => {
    return new Promise((resolve, reject) => {
        Category.bulkCreate(categories, {
            updateOnDuplicate: ["name", "slug", "image", "updatedAt", "sortOrder"]
        }).then((createdCategories) => {
            resolve(createdCategories);
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategories
};