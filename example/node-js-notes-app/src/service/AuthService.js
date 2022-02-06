import bcrypt from "bcrypt";
import * as db from "../models";
import jwt from "jsonwebtoken";

export const checkUserGetOauthCredentials = (
  loginCredentials,
  success,
  notFound,
  error
) => {
  db.user
    .findAll({
      attributes: ["password", "id", "username", "email"],
      where: {
        username: loginCredentials.username,
      },
      raw: true,
      order: [["id", "DESC"]],
    })
    .then((result) => {
      if (result.length > 0) {
        if (bcrypt.compareSync(loginCredentials.password, result[0].password)) {
          const token = jwt.sign(
            {
              username: result[0].username,
              email: result[0].email,
              id: result[0].id,
            },
            process.env.JWT_TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          success(token);
        } else {
          notFound({});
        }
      } else {
        notFound({});
      }
    })
    .catch((err) => {
      error(err);
    });
};
