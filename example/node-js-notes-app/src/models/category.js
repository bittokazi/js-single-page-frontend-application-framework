"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "category",
    {
      title: DataTypes.STRING,
    },
    {}
  );
  Category.associate = function (models) {
    Category.belongsTo(models.user, { foreignKey: "userid", as: "user" });
  };
  return Category;
};
