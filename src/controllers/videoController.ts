import { Request, Response } from "express";
import VideoService from "../services/videoService";
import { VideoQueryRepository } from "../repositories/query";
import DBService from "../services/dbService";
import { VideoCommandRepository } from "../repositories/command";
import { StatusCodes } from "../enums/StatusCodes";

class VideoController implements Base.Controller {
  private videoQueryRepository: VideoQueryRepository = new VideoQueryRepository(DBService);

  private videoService: VideoService = new VideoService(
    this.videoQueryRepository,
    new VideoCommandRepository(DBService),
  );

  public async getAll(req: Request, res: Response<Models.VideoModel[]>) {
    const data = await this.videoQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  }

  public async getById(req: Request<Params.URIId>, res: Response) {
    const id = req.params.id;
    const entity = await this.videoQueryRepository.getId(id);

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  }

  public async create(req: Request<Record<string, unknown>, Models.VideoModelCreateDTO>, res: Response) {
    const videoEntity = req.body;

    const result = await this.videoService.create(videoEntity);

    res.status(StatusCodes.Created_201).send(result);
  }

  public async update(req: Request<{ id: string }, Models.VideoModelUpdateDTO>, res: Response) {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.videoService.update(id, videoEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(this.videoService.getId(id));
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.videoService.delete(id);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  }
}

export default new VideoController();
