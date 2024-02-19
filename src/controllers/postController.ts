import { Request, Response } from "express";
import PostService from "../services/postService";
import { PostQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";

class PostController implements Base.Controller {
  constructor(
    private postQueryRepository: typeof PostQueryRepository,
    private postService: typeof PostService,
  ) {}

  public getAll = async (req: Request, res: Response<Models.PostModel[]>) => {
    const data = await this.postQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Request<Params.URIId>, res: Response) => {
    const id = req.params.id;
    const entity = await this.postQueryRepository.getId(id);

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async (req: Request<Record<string, unknown>, Models.PostModelCreateAndUpdateDTO>, res: Response) => {
    const entity = req.body;

    const result = await this.postService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (req: Request<{ id: string }, Models.PostModelCreateAndUpdateDTO>, res: Response) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.postService.update(id, videoEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = await this.postService.delete(id);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new PostController(PostQueryRepository, PostService);
