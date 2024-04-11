import { Response } from "express";
import { PostService, CommentsService } from "../services";
import { PostQueryRepository, CommentsQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";
import { SortingService, PaginationService, FilterService } from "../application";
import { FiltersType } from "../enums/Filters";

class PostController implements Base.Controller {
  constructor(
    private readonly postQueryRepository: typeof PostQueryRepository,
    private readonly commentsQueryRepository: typeof CommentsQueryRepository,
    private readonly postService: typeof PostService,
    private readonly sortingService: Base.SortingService,
    private readonly filterService: Base.FilterService<ViewModels.Comment>,
    private readonly paginationService: typeof PaginationService,
    private readonly commentsService: typeof CommentsService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.Post>>,
  ) => {
    const {
      query: { sortBy, sortDirection, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy as keyof ViewModels.Post, sortDirection);

    const data = await this.postQueryRepository.getWithPagination();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;
    const entity = await this.postQueryRepository.getById(String(id));

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

  public getComments = async (
    req: Utils.ReqWithParamsAndQuery<Params.URIId, Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.Comment>>,
  ) => {
    const {
      context: { user },
      params: { id },
      query: { sortBy, sortDirection, pageNumber, pageSize },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy as keyof ViewModels.Comment, sortDirection);
    this.filterService.setValue("postId", id, FiltersType.ById);

    const data = await this.commentsQueryRepository.getWithPagination(!!user?.id);

    if (!data.items.length) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(data);
  };

  public createComment = async (req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.Comment>, res: any) => {
    const {
      body,
      params: { id },
      context: { user },
    } = req;

    const postEntity = await this.postQueryRepository.getById(String(id));

    if (!postEntity) res.status(StatusCodes.NotFound_404).end();
    else {
      const result = await this.commentsService.create(body, user!.id, String(id));

      if (!result) res.status(StatusCodes.BadRequest_400).end();
      else res.status(StatusCodes.Created_201).send(result);
    }
  };
}

export default new PostController(
  PostQueryRepository,
  CommentsQueryRepository,
  PostService,
  SortingService,
  FilterService,
  PaginationService,
  CommentsService,
);
