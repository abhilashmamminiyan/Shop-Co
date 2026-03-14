const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      originalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      discountPercentage: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
      },
      sizes: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      colors: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      image: {
        type: DataTypes.STRING,
      },
      images: {
        type: DataTypes.JSON,
      },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      description: {
        type: DataTypes.TEXT,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      tableName: "products",
      timestamps: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: "categoryId",
      as: "category",
    });
  };

  module.exports = {Product};