import { Router } from "express";
import SessionController from "../controllers/sessionController";
import { SessionRoutes } from "../enums/Routs";
import { sessionsValidators } from "../validators/sessions";
import { jwtRefreshAuth } from "../middlewares";

export const sessionRouter = Router();

sessionRouter
  .get(SessionRoutes.Devices, jwtRefreshAuth, SessionController.getAllUserSessions)
  .delete(SessionRoutes.Devices, jwtRefreshAuth, SessionController.removeAllUserSessions)
  .delete(
    SessionRoutes.DevicesWithId,
    jwtRefreshAuth,
    ...sessionsValidators.removeById,
    SessionController.removeUserSessionById,
  );
