import { body, param } from "express-validator";
import { ObjectId } from "mongodb";

const idValidation = param("id").isString().custom(ObjectId.isValid);

export const userValidators = {
  create: [
    body("login")
      .isString()
      .trim()
      .isLength({ min: 3, max: 10 })
      .matches(/^[a-zA-Z0-9_-]*$/),
    body("email")
      .isEmail()
      .trim()
      .isLength({ min: 6, max: 30 })
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    body("password").isString().trim().isLength({ min: 6, max: 20 }),
  ],
  delete: idValidation,
};
