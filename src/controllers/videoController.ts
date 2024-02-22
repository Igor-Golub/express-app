import { Request, Response } from "express";
import VideoService from "../services/videoService";
import { VideoQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";

class VideoController implements Base.Controller {
  constructor(
    private videoQueryRepository: typeof VideoQueryRepository,
    private videoService: typeof VideoService,
  ) {}

  public getAll = async (req: Utils.ReqWithQuery<Params.PaginationQueryParams>, res: Response<ViewModels.Video[]>) => {
    const data = await this.videoQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;
    const entity = await this.videoQueryRepository.getId(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.VideoCreate>, res: Response) => {
    const videoEntity = req.body;

    const result = await this.videoService.create(videoEntity);

    res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.VideoUpdate>, res: Response) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.videoService.update(String(id), videoEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const result = await this.videoService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new VideoController(VideoQueryRepository, VideoService);
