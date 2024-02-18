import { Request, Response } from "express";
import VideoService from "../services/videoService";

class VideoController implements Base.Controller {
  constructor(private videoService: VideoService) {}

  public async getAll(req: Request, res: Response<Contracts.VideoModel[]>) {
    const data = await this.videoService.get();

    res.status(200).send(data);
  }

  public async getById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const entity = await this.videoService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  }

  public async create(
    req: Request<Record<string, unknown>, Contracts.VideoModelCreateDTO>,
    res: Response,
  ) {
    const videoEntity = req.body;

    const result = await this.videoService.create(videoEntity);

    res.status(201).send(result);
  }

  public async update(
    req: Request<{ id: string }, Contracts.VideoModelUpdateDTO>,
    res: Response,
  ) {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.videoService.update(id, videoEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(this.videoService.getId(id));
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.videoService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  }
}

export default VideoController;
