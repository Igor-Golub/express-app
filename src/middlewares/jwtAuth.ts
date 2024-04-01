import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { StatusCodes } from "../enums/StatusCodes";

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(StatusCodes.Unauthorized_401).end();

  const payload = await AuthService.jwtAccessVerification(authHeader);

  if (!payload) return res.status(StatusCodes.Unauthorized_401).end();

  req.context = {
    user: {
      id: payload._id.toString(),
    },
  };

  return next();
};
