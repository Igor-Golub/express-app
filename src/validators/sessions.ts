import { param } from "express-validator";
import { validation } from "../middlewares";

export const sessionsValidators = {
  removeById: [param("id").isString(), validation],
};
