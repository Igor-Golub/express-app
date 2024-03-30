import { Router } from "express";
import { AuthRouts } from "../enums/Routs";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAuth, rateLimit } from "../middlewares";

export const authRouter = Router({});

authRouter
  .get(AuthRouts.Me, jwtAuth, AuthController.me)
  .post(AuthRouts.Login, rateLimit, ...authValidators.login, AuthController.login)
  .post(AuthRouts.Confirmation, rateLimit, ...authValidators.confirmation, AuthController.confirmation)
  .post(AuthRouts.Registration, rateLimit, ...authValidators.registration, AuthController.registration)
  .post(AuthRouts.Resending, rateLimit, ...authValidators.resending, AuthController.resending)
  .post(AuthRouts.Refresh, AuthController.refreshTokenPair)
  .post(AuthRouts.Logout, AuthController.logout);
