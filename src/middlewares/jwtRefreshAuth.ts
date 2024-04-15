import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { StatusCodes, CookiesKeys } from "../enums";
import { container } from "../inversify.config";
import { CookiesService } from "../application";

const authService = container.resolve(AuthService);
const cookiesService = container.resolve(CookiesService);

export const jwtRefreshAuth = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken = cookiesService.read(req, CookiesKeys.RefreshToken);

  if (!refreshToken) return res.status(StatusCodes.Unauthorized_401).end();

  const payload = await authService.jwtRefreshVerification(refreshToken);

  if (!payload) return res.status(StatusCodes.Unauthorized_401).end();

  req.context = {
    user: {
      id: payload.userId,
    },
  };

  return next();
};
