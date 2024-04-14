import { Router } from "express";
import { AuthRouts } from "../enums/Routs";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAccessAuth, rateLimit, jwtRefreshAuth } from "../middlewares";
import { container } from "../inversify.config";

const authController = container.resolve(AuthController);

export const authRouter = Router({});

authRouter
  .get(AuthRouts.Me, jwtAccessAuth, authController.me)
  .post(AuthRouts.Login, rateLimit, ...authValidators.login, authController.login)
  .post(AuthRouts.Confirmation, rateLimit, ...authValidators.confirmation, authController.confirmation)
  .post(AuthRouts.Registration, rateLimit, ...authValidators.registration, authController.registration)
  .post(AuthRouts.Resending, rateLimit, ...authValidators.resending, authController.resending)
  .post(AuthRouts.Refresh, jwtRefreshAuth, authController.refreshTokenPair)
  .post(AuthRouts.Recovery, rateLimit, ...authValidators.recovery, authController.recoveryPassword)
  .post(AuthRouts.NewPassword, rateLimit, ...authValidators.newPassword, authController.createNewPassword)
  .post(AuthRouts.Logout, authController.logout);
