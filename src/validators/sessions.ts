import { param } from "express-validator";
import { ObjectId } from "mongodb";
import { validation } from "../middlewares/validation";

export const sessionsValidators = {
  removeById: [param("id").isString().custom(ObjectId.isValid), validation],
};
