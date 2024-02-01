import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { Routs } from "./enums/Routs";
import DBService from "./services/dbService";
import { db } from "./db";
import VideoService from "./services/videoService";

const app = express();

app.use(bodyParser({}));

const videoService = new VideoService(new DBService(db));

app.get(Routs.Videos, (_, res: Response<Contracts.VideoModel[]>) => {
  const data = videoService.get();

  res.send(data);
});

app.get(Routs.VideosWithId, (req: Request<{ id: string }>, res: Response) => {
  const id = req.params.id;
  const entity = videoService.getId(Number(id));

  res.send(entity);
});

app.post(
  Routs.Videos,
  (
    req: Request<Record<string, unknown>, Contracts.VideoModelCreateDTO>,
    res: Response,
  ) => {
    const videoEntity = req.body;

    const newEntity = videoService.create(videoEntity);

    res.sendStatus(201).send(newEntity);
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

    if (!result) res.sendStatus(400);
    else res.sendStatus(200).send(videoService.getId(Number(id)));
  },
);

app.delete(
  Routs.VideosWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    videoService.delete(Number(id));

    res.sendStatus(204).send({ message: "Removed" });
  },
);

app.listen(3001, () => {});
