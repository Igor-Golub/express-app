import { NextFunction, Request, Response } from "express";

export const session = (req: Request, res: Response, next: NextFunction) => {
  return next();
};
