import { NextFunction, Request, Response } from "express";
import AuthService from "../services/authService";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const isAuth = await AuthService.basicVerification(authHeader);

  if (!isAuth) return res.status(401).end();
  return next();
};
