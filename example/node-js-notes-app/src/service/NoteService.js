import * as db from "../models";

export const AddNote = (payload, userid, success, error) => {
  payload.userid = userid;
  db.note
    .create(payload)
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const GetNotes = (userid, success, error) => {
  db.note
    .findAll({
      where: {
        userid,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: db.category,
          as: "category",
        },
      ],
    })
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};


export const UpdateNote = (payload, userid, success, error) => {
  payload.userid = userid;
  db.note
    .update(payload, {
      where: {
        id: payload.id,
      },
    })
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const GetNote = (id, success, error) => {
  db.note
    .findOne({
      where: {
        id,
      },
      order: [["id", "DESC"]],
      include: [
        {
          model: db.user,
          as: "user",
          attributes: ["id", "username", "email"],
        },
        {
          model: db.category,
          as: "category",
        },
      ],
    })
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};