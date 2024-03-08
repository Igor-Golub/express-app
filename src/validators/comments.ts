import { body, param } from "express-validator";
import { ObjectId } from "mongodb";

const isIdValid = param("id").isString().custom(ObjectId.isValid);

export const commentsValidators = {
  readById: isIdValid,
  updateById: [isIdValid, body("content").isString().trim().isLength({ min: 20, max: 300 })],
  removeById: isIdValid,
};
