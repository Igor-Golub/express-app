import { Router } from "express";
import { AuthRouts } from "../enums/Routs";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAccessAuth, rateLimit, jwtRefreshAuth } from "../middlewares";

export const authRouter = Router({});

authRouter
  .get(AuthRouts.Me, jwtAccessAuth, AuthController.me)
  .post(AuthRouts.Login, rateLimit, ...authValidators.login, AuthController.login)
  .post(AuthRouts.Confirmation, rateLimit, ...authValidators.confirmation, AuthController.confirmation)
  .post(AuthRouts.Registration, rateLimit, ...authValidators.registration, AuthController.registration)
  .post(AuthRouts.Resending, rateLimit, ...authValidators.resending, AuthController.resending)
  .post(AuthRouts.Refresh, jwtRefreshAuth, AuthController.refreshTokenPair)
  .post(AuthRouts.Recovery, rateLimit, ...authValidators.recovery, AuthController.recoveryPassword)
  .post(AuthRouts.NewPassword, rateLimit, ...authValidators.newPassword, AuthController.createNewPassword)
  .post(AuthRouts.Logout, AuthController.logout);
