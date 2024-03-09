import { Router } from "express";
import { AuthRouts } from "../enums/Routs";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAuth } from "../middlewares/jwtAuth";

export const authRouter = Router({});

authRouter
  .get(AuthRouts.Me, jwtAuth, AuthController.me)
  .post(AuthRouts.Login, ...authValidators.login, AuthController.login);
