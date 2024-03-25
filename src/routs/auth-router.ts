import { Router } from "express";
import { AuthRouts } from "../enums/Routs";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAuth } from "../middlewares/jwtAuth";

export const authRouter = Router({});

authRouter
  .get(AuthRouts.Me, jwtAuth, AuthController.me)
  .post(AuthRouts.Login, ...authValidators.login, AuthController.login)
  .post(AuthRouts.Confirmation, ...authValidators.confirmation, AuthController.confirmation)
  .post(AuthRouts.Registration, ...authValidators.registration, AuthController.registration)
  .post(AuthRouts.Resending, ...authValidators.resending, AuthController.resending)
  .post(AuthRouts.Refresh, AuthController.refreshToken)
  .post(AuthRouts.Refresh, AuthController.logout);
