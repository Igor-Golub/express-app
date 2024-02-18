import { Request, Response } from "express";
import BlogService from "../services/blogService";

class BlogController implements Base.Controller {
  constructor(private blogService: BlogService) {}

  public async getAll(req: Request, res: Response<Contracts.BlogModel[]>) {
    const data = await this.blogService.get();

    res.status(200).send(data);
  }

  public async getById(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;
    const entity = await this.blogService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  }

  public async create(
    req: Request<
      Record<string, unknown>,
      Contracts.BlogModelCreateAndUpdateDTO
    >,
    res: Response,
  ) {
    const entity = req.body;

    const result = await this.blogService.create(entity);

    res.status(201).send(result);
  }

  public async update(
    req: Request<{ id: string }, Contracts.BlogModelCreateAndUpdateDTO>,
    res: Response,
  ) {
    const id = req.params.id;
    const blogEntity = req.body;

    const result = await this.blogService.update(id, blogEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(this.blogService.getId(id));
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.blogService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  }
}

export default BlogController;
