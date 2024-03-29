import { param } from "express-validator";
import { validation } from "../middlewares/validation";

export const sessionsValidators = {
  removeById: [param("id").isString(), validation],
};
