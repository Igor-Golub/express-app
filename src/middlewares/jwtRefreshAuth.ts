import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { StatusCodes } from "../enums/StatusCodes";
import cookiesService from "../application/cookiesService";
import { CookiesKeys } from "../enums/CookiesKeys";

export const jwtRefreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = cookiesService.read(req, CookiesKeys.RefreshToken);

  if (!refreshToken) return res.status(StatusCodes.Unauthorized_401).end();

  const payload = await AuthService.jwtRefreshVerification(refreshToken);

  if (!payload) return res.status(StatusCodes.Unauthorized_401).end();

  req.context = {
    user: {
      id: payload.userId,
    },
  };

  return next();
};
