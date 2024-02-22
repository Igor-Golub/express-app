import { NextFunction, Response } from "express";
import paginationService from "../services/paginationService";

export const pagination = (
  req: Utils.ReqWithQuery<Params.PaginationQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  paginationService.createPagination(req);

  next();
};
