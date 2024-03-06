import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { StatusCodes } from "../enums/StatusCodes";

export const basicAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(StatusCodes.Unauthorized_401).end();

  const isAuth = await AuthService.basicVerification(authHeader);

  if (!isAuth) return res.status(StatusCodes.Unauthorized_401).end();

  return next();
};
