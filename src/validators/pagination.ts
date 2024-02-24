import { query } from "express-validator";

export const paginationValidators = [
  query("pageNumber").optional().trim().isInt({ min: 1, max: 1000 }),
  query("pageSize").optional().trim().isInt({ min: 1, max: 1000 }),
];
