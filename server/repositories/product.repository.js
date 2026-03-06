const { Product } = require("../models/product.models");

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
        Product.bulkCreate(products).then((createdProducts) => {
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
