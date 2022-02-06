"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      changePassword: DataTypes.BOOLEAN,
      role: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {};
  return User;
};
