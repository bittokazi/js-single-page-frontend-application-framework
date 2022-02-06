import { HelloWorld } from "./../controllers/HelloController";
import userRoutes from "./User";
import authRoutes from "./Auth";
import categoryRoutes from "./Category";
import noteRoutes from "./Note";
import { JwtVerifyToken } from "../middlewares/JwtAuth";

export const Routes = (app) => {
  app.get("/health", HelloWorld);
  app.use("/api/login", authRoutes);
  app.use("/api/users", JwtVerifyToken, userRoutes);
  app.use("/api/categories", JwtVerifyToken, categoryRoutes);
  app.use("/api/notes", JwtVerifyToken, noteRoutes);
};

export default Routes;
