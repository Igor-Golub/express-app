import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";
import { jwtAuth } from "../middlewares/jwtAuth";

export const authRouter = Router({});

authRouter
  .get(Routs.Me, jwtAuth, AuthController.me)
  .post(Routs.Login, ...authValidators.auth, validation, AuthController.login);
