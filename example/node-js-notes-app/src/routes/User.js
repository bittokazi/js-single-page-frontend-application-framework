import express from "express";
import {
  UserList,
  whoAmI,
  checkUserExist,
  addUserController,
  getChatServerToken,
} from "./../controllers/UserController";
import FormValidator from "./../middlewares/FormValidator";

const router = express.Router();

router.get("/", UserList);
router.post("/", FormValidator("createUser"), addUserController);
router.get("/whoami", whoAmI);
router.post("/check-exist", checkUserExist);

export default router;
