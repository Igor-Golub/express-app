import { body } from "express-validator";
import { validation } from "../middlewares";

const emailValidator = body("email")
  .isString()
  .trim()
  .isLength({ min: 3, max: 100 })
  .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

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
    body("password").isString().trim().isLength({ min: 6, max: 20 }),
    emailValidator,
    validation,
  ],
  resending: [emailValidator, validation],
  recovery: [emailValidator, validation],
  newPassword: [
    body("newPassword").isString().trim().isLength({ min: 6, max: 20 }),
    body("recoveryCode").isString(),
    validation,
  ],
};
