import { query } from "express-validator";

export const filterValidators = [query("searchNameTerm").optional().isString().trim().isInt({ min: 1, max: 1000 })];
