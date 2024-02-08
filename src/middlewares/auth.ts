import { NextFunction, Request, Response } from "express";
import UserService from "../services/userService";
import UserRepository from "../repositories/userRepository";
import DbService from "../services/dbService";

const userService = new UserService(new UserRepository(DbService));

const decodeToken = (
  token: string,
): {
  name: string;
  password: string;
} => {
  const [, password] = token.split(" ");

  const secret = Buffer.from(password, "base64").toString("ascii");

  return {
    name: secret.split(":")[0],
    password,
  };
};

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const { password, name } = decodeToken(authHeader);

  const user = userService.getByName(name);

  if (user?.password !== password) return res.status(401).end();

  return next();
};
