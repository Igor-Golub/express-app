import { NextFunction, Request, Response } from "express";
import AuthService from "../application/authService";
import { container } from "../inversify.config";

const authService = container.resolve(AuthService);

export const jwtExisting = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const payload = await authService.jwtAccessVerification(authHeader);

    req.context = {
      user: {
        id: payload?._id?.toString() ?? "",
      },
    };
  } else {
    req.context = {
      user: {
        id: "",
      },
    };
  }

  return next();
};
