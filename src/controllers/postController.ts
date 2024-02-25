import { Response } from "express";
import PostService from "../services/postService";
import { PostQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";
import SortingService from "../services/sortingService";
import PaginationService from "../services/paginationService";

class PostController implements Base.Controller {
  constructor(
    private postQueryRepository: typeof PostQueryRepository,
    private postService: typeof PostService,
    private sortingService: Base.SortingService,
    private paginationService: typeof PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<ViewModels.ResponseWithPagination<ViewModels.Post>>,
  ) => {
    const {
      query: { sortBy, sortDirection, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy as keyof ViewModels.Post, sortDirection);

    const data = await this.postQueryRepository.getWithPagination(this.sortingService.createSortCondition());

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;
    const entity = await this.postQueryRepository.getId(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.PostCreateAndUpdate>, res: Response) => {
    const entity = req.body;

    const result = await this.postService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.PostCreateAndUpdate>,
    res: Response,
  ) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await this.postService.update(String(id), videoEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const result = await this.postService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new PostController(PostQueryRepository, PostService, SortingService, PaginationService);
