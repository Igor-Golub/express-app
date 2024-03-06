import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import userQueryRepository from "../repositories/query/userQueryRepository";
import { StatusCodes } from "../enums/StatusCodes";

export const jwtAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(StatusCodes.Unauthorized_401).end();

  const payload = await AuthService.jwtVerification(authHeader);

  if (!payload) return res.status(StatusCodes.Unauthorized_401).end();

  if (typeof payload === "object") {
    const user = await userQueryRepository.findUserByLoginOrEmail(payload?.userLogin);

    if (!user) return res.status(StatusCodes.Unauthorized_401).end();

    req.context = { user };
  }

  return next();
};
