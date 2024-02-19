import { Request, Response } from "express";
import PostService from "../services/postService";
import { BlogQueryRepository, PostQueryRepository } from "../repositories/query";
import DBService from "../services/dbService";
import { PostCommandRepository } from "../repositories/command";
import { StatusCodes } from "../enums/StatusCodes";

class PostController implements Base.Controller {
  private postQueryRepository: PostQueryRepository = new PostQueryRepository(DBService);

  private postService: PostService = new PostService(
    this.postQueryRepository,
    new PostCommandRepository(DBService),
    new BlogQueryRepository(DBService),
  );

  public async getAll(req: Request, res: Response<Models.PostModel[]>) {
    const data = await this.postQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  }

  public async getById(req: Request<Params.URIId>, res: Response) {
    const id = req.params.id;
    const entity = await this.postQueryRepository.getId(id);

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  }

  public async create(req: Request<Record<string, unknown>, Models.PostModelCreateAndUpdateDTO>, res: Response) {
    const entity = req.body;

    const result = await this.postService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  }

  public async update(req: Request<{ id: string }, Models.PostModelCreateAndUpdateDTO>, res: Response) {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.postService.update(id, videoEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(this.postService.getId(id));
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.postService.delete(id);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  }
}

export default new PostController();
