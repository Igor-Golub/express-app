import { body, param } from "express-validator";
import { ObjectId } from "mongodb";
import { validation } from "../middlewares/validation";

const isIdValid = param("id").isString().custom(ObjectId.isValid);

export const commentsValidators = {
  readById: [isIdValid, validation],
  updateById: [isIdValid, body("content").isString().trim().isLength({ min: 20, max: 300 }), validation],
  removeById: [isIdValid, validation],
};
