import {
  AddCategory,
  GetAllCategories,
  GetCategory,
  UpdateCategory,
} from "../service/CategoryService";

export const AddCategoryController = (req, res, next) => {
  AddCategory(
    req.body,
    req.user.id,
    (result) => {
      return res.status(200).json(result);
    },
    (error) => {
      console.error(error);
      return res.status(500).json({
        message: "Database Error",
      });
    }
  );
};

export const GetCategoriesController = (req, res, next) => {
  GetAllCategories(
    req.user.id,
    (result) => {
      return res.status(200).json(result);
    },
    (error) => {
      console.error(error);
      return res.status(500).json({
        message: "Database Error",
      });
    }
  );
};

export const UpdateCategoryController = (req, res, next) => {
  UpdateCategory(
    req.body,
    req.user.id,
    (result) => {
      return res.status(200).json(result);
    },
    (error) => {
      console.error(error);
      return res.status(500).json({
        message: "Database Error",
      });
    }
  );
};

export const GetCategoryController = (req, res, next) => {
  GetCategory(
    req.param("id"),
    (result) => {
      return res.status(200).json(result);
    },
    (error) => {
      console.error(error);
      return res.status(404).json({
        message: "404",
      });
    }
  );
};
