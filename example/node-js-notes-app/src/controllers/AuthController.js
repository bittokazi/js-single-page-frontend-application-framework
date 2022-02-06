import { checkUserGetOauthCredentials } from "./../service/AuthService";

export const login = (req, res, next) => {
  checkUserGetOauthCredentials(
    {
      username: req.body.username,
      password: req.body.password,
    },
    (result) => {
      return res.status(200).json({ token: result });
    },
    (notFound) => {
      return res.status(401).json({
        message: "Authorization Failed",
      });
    },
    (error) => {
      return res.status(500).json(error);
    }
  );
};
