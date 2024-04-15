import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { StatusCodes } from "../enums";
import { container } from "../inversify.config";

const authService = container.resolve(AuthService);

export const jwtAccessAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(StatusCodes.Unauthorized_401).end();

  const payload = await authService.jwtAccessVerification(authHeader);

  if (!payload) return res.status(StatusCodes.Unauthorized_401).end();

  req.context = {
    user: {
      id: payload._id.toString(),
    },
  };

  return next();
};
