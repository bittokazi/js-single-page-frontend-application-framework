"use strict";
module.exports = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "note",
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
    },
    {}
  );
  Note.associate = function (models) {
    Note.belongsTo(models.user, { foreignKey: "userid", as: "user" });
    Note.belongsTo(models.category, {
      foreignKey: "categoryid",
      as: "category",
    });
  };
  return Note;
};
