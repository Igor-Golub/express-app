import { Router } from "express";
import { Routs } from "../enums/Routs";
import VideoController from "../controllers/videoController";
import VideoService from "../services/videoService";
import { VideoQueryRepository } from "../repositories/query";
import { VideoCommandRepository } from "../repositories/command";
import { videoValidators } from "../validators/video";
import { validation } from "../middlewares/validation";
import DBService from "../services/dbService";

export const videoRouter = Router({});

const videoController = new VideoController(
  new VideoService(
    new VideoQueryRepository(DBService),
    new VideoCommandRepository(DBService),
  ),
);

videoRouter.get(Routs.Root, videoController.getAll);

videoRouter.get(Routs.RootWithId, videoController.getById);

videoRouter.post(
  Routs.Root,
  ...videoValidators.create,
  validation,
  videoController.create,
);

videoRouter.put(
  Routs.RootWithId,
  ...videoValidators.update,
  validation,
  videoController.update,
);

videoRouter.delete(Routs.RootWithId, videoController.delete);
