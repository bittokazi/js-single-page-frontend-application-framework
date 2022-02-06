import express from "express";
import {
  AddNoteController,
  GetNoteController,
  GetNotesController,
  UpdateNoteController,
} from "../controllers/NotesController";
import FormValidator from "./../middlewares/FormValidator";

const router = express.Router();

router.get("/", GetNotesController);
router.post("/", FormValidator("createCategory"), AddNoteController);
router.put("/:id", FormValidator("createCategory"), UpdateNoteController);
router.get("/:id", GetNoteController);

export default router;
