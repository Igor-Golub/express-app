import { body } from "express-validator";

export const userValidators = {
  create: [
    body("name").isString().trim().isLength({ min: 3, max: 30 }),
    body("password").isString().trim().isLength({ min: 1, max: 100 }),
  ],
};
