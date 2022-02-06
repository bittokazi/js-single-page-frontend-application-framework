import jwt from "jsonwebtoken";
import pg from "./../engine/PgPromise";

export const JwtVerifyToken = (req, res, next) => {
  const token =
    req.headers["Authorization"] || req.headers["authorization"] || "";
  if (
    (token.split(" ")[0] && token.split(" ")[0] != "Bearer") ||
    !token.split(" ")[1]
  ) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN_KEY);
    pg.query("SELECT * FROM users WHERE id = $1", [decoded.id])
      .then(function (result1) {
        if (result1.length > 0) {
          req.user = result1[0];
        } else {
          req.user = undefined;
        }
        next();
      })
      .catch(function (error) {
        req.user = undefined;
        next();
      });
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};
