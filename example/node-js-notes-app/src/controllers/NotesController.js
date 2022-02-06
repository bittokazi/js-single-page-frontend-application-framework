import { AddNote, GetNote, GetNotes, UpdateNote } from "../service/NoteService";

export const AddNoteController = (req, res, next) => {
  AddNote(
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

export const GetNotesController = (req, res, next) => {
  GetNotes(
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

export const UpdateNoteController = (req, res, next) => {
  UpdateNote(
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

export const GetNoteController = (req, res, next) => {
  GetNote(
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
