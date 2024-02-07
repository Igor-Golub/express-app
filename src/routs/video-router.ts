import { Request, Response, Router } from "express";
import { Routs } from "../enums/Routs";
import VideoService from "../services/videoService";
import VideoRepository from "../repositories/videoRepository";
import { videoValidators } from "../validators/video";
import { validation } from "../middlewares/validation";
import DBService from "../services/dbService";

export const videoRouter = Router({});

const videoService = new VideoService(new VideoRepository(new DBService()));

videoRouter.get(Routs.Root, (_, res: Response<Contracts.VideoModel[]>) => {
  const data = videoService.get();

  res.status(200).send(data);
});

videoRouter.get(
  Routs.RootWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const entity = videoService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  },
);

videoRouter.post(
  Routs.Root,
  ...videoValidators.create,
  validation,
  (
    req: Request<Record<string, unknown>, Contracts.VideoModelCreateDTO>,
    res: Response,
  ) => {
    const videoEntity = req.body;

    const result = videoService.create(videoEntity);

    res.status(201).send(result);
  },
);

videoRouter.put(
  Routs.RootWithId,
  ...videoValidators.update,
  validation,
  (
    req: Request<{ id: string }, Contracts.VideoModelUpdateDTO>,
    res: Response,
  ) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = videoService.update(id, videoEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(videoService.getId(id));
  },
);

videoRouter.delete(
  Routs.RootWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = videoService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  },
);
