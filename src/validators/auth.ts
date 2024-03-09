import { body, param } from "express-validator";
import { ObjectId } from "mongodb";
import { validation } from "../middlewares/validation";

export const authValidators = {
  login: [
    body("loginOrEmail").isString().trim().isLength({ min: 3, max: 100 }),
    body("password").isString().trim().isLength({ min: 6, max: 100 }),
    validation,
  ],
};
