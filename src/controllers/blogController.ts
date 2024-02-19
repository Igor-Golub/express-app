import { Request, Response } from "express";
import BlogService from "../services/blogService";
import { BlogQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";

class BlogController implements Base.Controller {
  constructor(
    private blogQueryRepository: Base.QueryRepository<Models.BlogModel>,
    private blogService: typeof BlogService,
  ) {}

  public getAll = async (req: Request, res: Response<Models.BlogModel[]>) => {
    const data = await this.blogQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const entity = await this.blogQueryRepository.getId(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async (req: Utils.ReqWithReqBody<Models.BlogModelCreateAndUpdateDTO>, res: Response) => {
    const entity = req.body;

    const result = await this.blogService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, Models.BlogModelCreateAndUpdateDTO>,
    res: Response,
  ) => {
    const id = req.params.id;
    const blogEntity = req.body;

    const result = await this.blogService.update(String(id), blogEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const result = await this.blogService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new BlogController(BlogQueryRepository, BlogService);
