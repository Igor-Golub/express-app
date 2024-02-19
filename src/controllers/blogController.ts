import { Request, Response } from "express";
import DBService from "../services/dbService";
import BlogService from "../services/blogService";
import { BlogQueryRepository } from "../repositories/query";
import { BlogCommandRepository } from "../repositories/command";
import { StatusCodes } from "../enums/StatusCodes";

class BlogController implements Base.Controller {
  private blogQueryRepository: Base.QueryRepository<Models.BlogModel> = new BlogQueryRepository(DBService);

  private blogService: BlogService = new BlogService(new BlogCommandRepository(DBService));

  public async getAll(req: Request, res: Response<Models.BlogModel[]>) {
    const data = await this.blogQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  }

  public async getById(req: Request<Params.URIId>, res: Response) {
    const id = req.params.id;
    const entity = await this.blogQueryRepository.getId(id);

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  }

  public async create(req: Request<Record<string, unknown>, Models.BlogModelCreateAndUpdateDTO>, res: Response) {
    const entity = req.body;

    const result = await this.blogService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  }

  public async update(req: Request<{ id: string }, Models.BlogModelCreateAndUpdateDTO>, res: Response) {
    const id = req.params.id;
    const blogEntity = req.body;

    const result = await this.blogService.update(id, blogEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  }

  public async delete(req: Request<{ id: string }>, res: Response) {
    const id = req.params.id;

    const result = await this.blogService.delete(id);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  }
}

export default new BlogController();
