import express from "express";
import {
  AddCategoryController,
  GetCategoriesController,
  GetCategoryController,
  UpdateCategoryController,
} from "../controllers/CategoryController";
import FormValidator from "./../middlewares/FormValidator";

const router = express.Router();

router.get("/", GetCategoriesController);
router.post("/", FormValidator("createCategory"), AddCategoryController);
router.put("/:id", FormValidator("createCategory"), UpdateCategoryController);
router.get("/:id", GetCategoryController);

export default router;
