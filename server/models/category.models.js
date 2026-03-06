const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

  const Category = sequelize.define(
    'Category',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      col:{
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
    }
  );

  Category.associate = (models) => {
    Category.hasMany(models.Product, {
      foreignKey: "categoryId",
      as: "products",
      onDelete: "CASCADE",
    });
  };

  module.exports = {Category};