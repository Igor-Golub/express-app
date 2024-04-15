import { body, param } from "express-validator";
import { ObjectId } from "mongodb";
import { validation } from "../middlewares";
import { LikeStatus } from "../enums";

const isIdValid = param("id").exists().isString().custom(ObjectId.isValid);

export const commentsValidators = {
  readById: [isIdValid, validation],
  updateById: [isIdValid, body("content").exists().isString().trim().isLength({ min: 20, max: 300 }), validation],
  likeStatus: [isIdValid, body("likeStatus").exists().isIn(Object.values(LikeStatus)), validation],
  removeById: [isIdValid, validation],
};
