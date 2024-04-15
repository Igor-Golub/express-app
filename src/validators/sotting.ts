import { query } from "express-validator";
import { SortingDirectionStrings } from "../enums";

export const sortingValidators = [
  query("sortDirection").optional().isIn(Object.values(SortingDirectionStrings)),
  query("sortBy").optional().isString(),
];
