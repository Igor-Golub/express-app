import { NextFunction, Request, Response } from "express";
import AuthService from "../services/authService";
import { StatusCodes } from "../enums/StatusCodes";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log(authHeader);

  if (!authHeader) return res.status(StatusCodes.Unauthorized_401).end();

  const isAuth = await AuthService.basicVerification(authHeader);

  if (!isAuth) return res.status(StatusCodes.Unauthorized_401).end();
  return next();
};
