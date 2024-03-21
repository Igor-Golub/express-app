import { NextFunction } from "express";
import { validationResult } from "express-validator";
import { StatusCodes } from "../enums/StatusCodes";

const convertErrorToContract = (errors: Record<string, { msg: string }>): Base.ErrorViewResponse => {
  return {
    errorsMessages: Object.entries(errors).map(([field, { msg }]) => ({
      field,
      message: msg,
    })),
  };
};

export const validation = (req: any, res: any, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.isEmpty()) res.status(StatusCodes.BadRequest_400).send(convertErrorToContract(result.mapped()));
  else next();
};
