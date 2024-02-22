import { Router } from "express";
import { Routs } from "../enums/Routs";
import VideoController from "../controllers/videoController";
import { videoValidators } from "../validators/video";
import { validation } from "../middlewares/validation";
import { pagination } from "../middlewares/pagination";

export const videoRouter = Router({});

videoRouter
  .get(Routs.Root, pagination, VideoController.getAll)
  .get(Routs.RootWithId, VideoController.getById)
  .post(Routs.Root, ...videoValidators.create, validation, VideoController.create)
  .put(Routs.RootWithId, ...videoValidators.update, validation, VideoController.update)
  .delete(Routs.RootWithId, VideoController.delete);
