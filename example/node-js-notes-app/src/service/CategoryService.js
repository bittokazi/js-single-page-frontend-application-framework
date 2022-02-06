import * as db from "../models";

export const AddCategory = (payload, userid, success, error) => {
  payload.userid = userid;
  db.category
    .create(payload)
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const GetAllCategories = (userid, success, error) => {
  db.category
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
      ],
    })
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};

export const UpdateCategory = (payload, userid, success, error) => {
  payload.userid = userid;
  db.category
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

export const GetCategory = (id, success, error) => {
  db.category
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
      ],
    })
    .then((result) => {
      success(result);
    })
    .catch((err) => {
      error(err);
    });
};
