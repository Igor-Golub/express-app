import { Router } from "express";
import { Routs } from "../enums/Routs";
import { validation } from "../middlewares/validation";
import AuthController from "../controllers/authController";
import { authValidators } from "../validators/auth";

export const authRouter = Router({});

authRouter.post(Routs.Login, ...authValidators.auth, validation, AuthController.login);
