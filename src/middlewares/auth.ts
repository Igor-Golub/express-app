import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import DbService from "../services/dbService";

const userService = new UserService(new UserRepository(DbService));

const decodeToken = (token: string) => {
  return Buffer.from(token.split(" ")[1], "base64").toString("ascii");
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const user = userService.getByName(decodeToken(authHeader));

  if (!user) return res.status(401).end();

  return next();
};
