import { NextFunction, Response } from "express";
import paginationService from "../services/paginationService";

export const pagination = (
  req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
  res: Response,
  next: NextFunction,
) => {
  const {
    query: { pageSize, pageNumber },
  } = req;

  paginationService.setValues({
    pageNumber,
    pageSize,
  });

  next();
};
