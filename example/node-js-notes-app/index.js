import express from "express";
import Engine from "./src/engine/Engine";

export const AppEngine = () => {
  let app = express();
  return {
    StartServer: () => {
      new Engine(app).init();
    }
  };
};

export default AppEngine;
