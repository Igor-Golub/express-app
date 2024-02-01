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

    const result = videoService.create(videoEntity);

    if (Array.isArray(result)) res.send({ errorsMessages: result });
    else res.send(result);
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

    if (Array.isArray(result)) res.send({ errorsMessages: result });
    else res.send(videoService.getId(Number(id)));
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
