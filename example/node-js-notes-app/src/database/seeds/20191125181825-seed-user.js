"use strict";
const bcrypt = require("bcrypt");
require("dotenv").config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userExist = await queryInterface.sequelize.query(
      `SELECT * FROM "users" WHERE username = '${process.env.DEFAULT_USER_NAME}'`,
      {
        type: queryInterface.sequelize.QueryTypes.SELECT,
      }
    );
    if (userExist.length < 1) {
      return queryInterface.bulkInsert(
        "users",
        [
          {
            firstName: "Bitto",
            lastName: "Kazi",
            username: process.env.DEFAULT_USER_NAME,
            password: bcrypt.hashSync(process.env.DEFAULT_USER_PASS, 10),
            email: process.env.DEFAULT_USER_EMAIL,
            changePassword: true,
            role: "admin",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    }
    return Promise.all([]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
