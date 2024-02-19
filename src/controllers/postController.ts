import { Request, Response } from "express";
import PostService from "../services/postService";

class PostController implements Base.Controller {
  constructor(private postService: PostService) {}

  public async getAll(req: Request, res: Response<Models.PostModel[]>) {
    const data = await this.postService.get();

    res.status(200).send(data);
  }

  public async getById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const entity = await this.postService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  }

  public async create(
    req: Request<Record<string, unknown>, Models.PostModelCreateAndUpdateDTO>,
    res: Response,
  ) {
    const entity = req.body;

    const result = await this.postService.create(entity);

    res.status(201).send(result);
  }

  public async update(
    req: Request<{ id: string }, Models.PostModelCreateAndUpdateDTO>,
    res: Response,
  ) {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.postService.update(id, videoEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(this.postService.getId(id));
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.postService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  }
}

export default PostController;
