import { Router } from "express";
import SessionController from "../modules/auth/api/sessionController";
import { SessionRoutes } from "../enums";
import { sessionsValidators } from "../validators/sessions";
import { jwtRefreshAuth } from "../middlewares";
import { container } from "../inversify.config";

const sessionController = container.resolve(SessionController);

export const sessionRouter = Router();

sessionRouter
  .get(SessionRoutes.Devices, jwtRefreshAuth, sessionController.getAllUserSessions)
  .delete(SessionRoutes.Devices, jwtRefreshAuth, sessionController.removeAllUserSessions)
  .delete(
    SessionRoutes.DevicesWithId,
    jwtRefreshAuth,
    ...sessionsValidators.removeById,
    sessionController.removeUserSessionById,
  );
