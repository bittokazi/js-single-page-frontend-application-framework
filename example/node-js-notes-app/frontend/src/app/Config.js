const devConfig = {
  API_BASE_URL: "http://localhost:5000/api",
};

const prodConfig = {
  API_BASE_URL: "https://spa-demo.bittokazi.com/api",
};

let selectedConf = devConfig;

if (process.env.DEPLOY_ENV === "prod") {
  selectedConf = prodConfig;
}

export const Config = selectedConf;
