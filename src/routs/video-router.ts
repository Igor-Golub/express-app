import { Request, Response, Router } from "express";
import { Routs } from "../enums/Routs";
import VideoService from "../services/videoService";
import DBService from "../services/dbService";
import { db } from "../db";
import { VideoValidator } from "../validators/videoValidator";

export const videoRouter = Router({});

const videoService = new VideoService(new DBService(db), new VideoValidator());

videoRouter.get(Routs.Root, (_, res: Response<Contracts.VideoModel[]>) => {
  const data = videoService.get();

  res.status(200).send(data);
});

videoRouter.get(
  Routs.RootWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const entity = videoService.getId(Number(id));

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  },
);

videoRouter.post(
  Routs.Root,
  (
    req: Request<Record<string, unknown>, Contracts.VideoModelCreateDTO>,
    res: Response,
  ) => {
    const videoEntity = req.body;

    const result = videoService.create(videoEntity);

    if (Array.isArray(result)) res.status(400).send({ errorsMessages: result });
    else res.status(201).send(result);
  },
);

videoRouter.put(
  Routs.RootWithId,
  (
    req: Request<{ id: string }, Contracts.VideoModelUpdateDTO>,
    res: Response,
  ) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = videoService.update(Number(id), videoEntity);

    if (!result) res.status(404).end();
    if (Array.isArray(result)) res.status(400).send({ errorsMessages: result });
    else res.status(204).send(videoService.getId(Number(id)));
  },
);

videoRouter.delete(
  Routs.RootWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = videoService.delete(Number(id));

    if (!result) res.status(404).end();
    else res.status(204).end();
  },
);

videoRouter.delete(Routs.Testing, (_, res: Response) => {
  videoService.clearData();

  res.status(204).end();
});
