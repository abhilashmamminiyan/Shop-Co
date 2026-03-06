const { Product } = require("../models/models");

const getAllProducts = async () => {
    return new Promise((resolve, reject) => {
        Product.findAll().then((products) => {
            resolve(products);
        }).catch((error) => {
            reject(error);
        });
    });
};

const getProductById = async (id) => {
    return new Promise((resolve, reject) => {
        Product.findByPk(id).then((product) => {
            resolve(product);
        }).catch((error) => {
            reject(error);
        });
    });
};

const createProducts = async (products) => {
    return new Promise((resolve, reject) => {
        Product.bulkCreate(products, {
            updateOnDuplicate: ["name", "slug", "price", "originalPrice", "discountPercentage", "type", "sizes", "colors", "image", "images", "description", "rating", "categoryId", "updatedAt"]
        }).then((createdProducts) => {
            resolve(createdProducts);
        }).catch((error) => {
            reject(error);
        });
    });
};

module.exports = {
    getAllProducts,
    getProductById,
    createProducts
};
