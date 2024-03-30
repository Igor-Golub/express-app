import { body } from "express-validator";
import { validation } from "../middlewares/validation";

export const authValidators = {
  login: [
    body("loginOrEmail").isString().trim().isLength({ min: 3, max: 100 }),
    body("password").isString().trim().isLength({ min: 6, max: 100 }),
    validation,
  ],
  confirmation: [body("code").isString().trim(), validation],
  registration: [
    body("login")
      .isString()
      .trim()
      .isLength({ min: 3, max: 10 })
      .matches(/^[a-zA-Z0-9_-]*$/),
    body("email")
      .isString()
      .trim()
      .isLength({ min: 3, max: 100 })
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    body("password").isString().trim().isLength({ min: 6, max: 20 }),
    validation,
  ],
  resending: [
    body("email")
      .isString()
      .trim()
      .isLength({ min: 3, max: 100 })
      .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
    validation,
  ],
};
