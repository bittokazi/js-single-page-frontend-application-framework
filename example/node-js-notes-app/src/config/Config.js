import "dotenv/config";

export const Config = () => {
  return {
    PORT: process.env.PORT || 8081,
    _DEFAULT_OAUTH_CLIENT_ID: process.env._DEFAULT_OAUTH_CLIENT_ID,
    _DEFAULT_OAUTH_CLIENT_SECRET: process.env._DEFAULT_OAUTH_CLIENT_SECRET,
  };
};

export default Config;
