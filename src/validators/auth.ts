import { body, param } from "express-validator";
import { ObjectId } from "mongodb";

export const authValidators = {
  auth: [
    body("loginOrEmail").isString().trim().isLength({ min: 3, max: 100 }),
    body("password").isString().trim().isLength({ min: 6, max: 100 }),
  ],
};
