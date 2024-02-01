import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Routs } from "./enums/Routs";
import DBService from "./services/dbService";
import { db } from "./db";
import VideoService from "./services/videoService";
import { VideoValidator } from "./validators/videoValidator";

const app = express();

app.use(bodyParser({}));

const videoService = new VideoService(new DBService(db), new VideoValidator());

app.get(Routs.Videos, (_, res: Response<Contracts.VideoModel[]>) => {
  const data = videoService.get();

  res.status(200).send(data);
});

app.get(Routs.VideosWithId, (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const entity = videoService.getId(Number(id));

  if (!entity) res.status(404).end();
  else res.status(200).send(entity);
});

app.post(
  Routs.Videos,
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

app.put(
  Routs.VideosWithId,
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

app.delete(
  Routs.VideosWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = videoService.delete(Number(id));

    if (!result) res.status(404).end();
    else res.status(204).end();
  },
);

app.delete(Routs.Testing, (_, res: Response) => {
  videoService.clearData();

  res.status(204).end();
});

app.listen(3000, () => {});
