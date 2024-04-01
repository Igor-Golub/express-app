import { Router } from "express";
import SessionController from "../controllers/sessionController";
import { SessionRoutes } from "../enums/Routs";
import { sessionsValidators } from "../validators/sessions";

export const sessionRouter = Router();

sessionRouter
  .get(SessionRoutes.Devices, SessionController.getAllUserSessions)
  .delete(SessionRoutes.Devices, SessionController.removeAllUserSessions)
  .delete(SessionRoutes.DevicesWithId, ...sessionsValidators.removeById, SessionController.removeUserSessionById);
