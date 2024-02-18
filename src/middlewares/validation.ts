import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const convertErrorToContract = (errors: Record<string, { msg: string }>) => {
  return {
    errorsMessages: Object.entries(errors).map(([field, { msg }]) => ({
      field,
      message: msg,
    })),
  };
};

export const validation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.isEmpty())
    res.status(400).send(convertErrorToContract(result.mapped()));
  else next();
};
