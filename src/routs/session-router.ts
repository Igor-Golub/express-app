import { Router } from "express";
import SessionController from "../controllers/sessionController";
import { SessionRoutes } from "../enums/Routs";
import { sessionsValidators } from "../validators/sessions";
import { jwtAuth } from "../middlewares/jwtAuth";

export const sessionRouter = Router();

sessionRouter
  .get(SessionRoutes.Devices, jwtAuth, SessionController.getAllUserSessions)
  .delete(SessionRoutes.Devices, jwtAuth, SessionController.removeAllUserSessions)
  .delete(
    SessionRoutes.DevicesWithId,
    jwtAuth,
    ...sessionsValidators.removeById,
    SessionController.removeUserSessionById,
  );
