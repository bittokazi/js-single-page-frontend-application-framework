import { body } from "express-validator";

export default function FormValidator(method) {
  switch (method) {
    case "createProject": {
      return [
        body("title", "Project title missing").exists().isLength({ min: 6 }),
        body("key", "Project key missing")
          .exists()
          .matches(/^[a-zA-Z0-9\-]+$/, "i")
          .isLength({ min: 3, max: 10 }),
      ];
    }
    case "createCategory": {
      return [
        body("title", "Category name missing").exists().isLength({ min: 1 }),
      ];
    }
    case "createBoard": {
      return [
        body("title", "Task title missing").exists().isLength({ min: 6 }),
      ];
    }
    case "createUser": {
      return [
        body("username", "Invalid username").exists().isLength({ min: 6 }),
        body("email", "Invalid email").exists().isEmail(),
        body("password", "Invalid password").exists().isLength({ min: 6 }),
      ];
    }
    case "signup": {
      return [
        body("user.username", "Invalid username").exists().isLength({ min: 6 }),
        body("user.email", "Invalid email").exists().isEmail(),
        body("user.password", "Invalid password").exists().isLength({ min: 6 }),
        body("company.name", "Invalid company name")
          .exists()
          .isLength({ min: 6 }),
        body("company.key", "Invalid company key")
          .exists()
          .matches(/^[a-zA-Z0-9]+$/, "i")
          .isLength({ min: 6, max: 20 }),
      ];
    }
  }
}
