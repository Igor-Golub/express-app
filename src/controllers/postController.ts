import { Response } from "express";
import { inject, injectable } from "inversify";
import { StatusCodes, FiltersType } from "../enums";
import { PostService, CommentsService } from "../services";
import { PostQueryRepo, CommentsQueryRepo } from "../repositories/query";
import { SortingService, PaginationService, FilterService } from "../application";

@injectable()
class PostController implements Base.Controller {
  constructor(
    @inject(PostQueryRepo) private readonly postQueryRepository: PostQueryRepo,
    @inject(CommentsQueryRepo) private readonly commentsQueryRepository: CommentsQueryRepo,
    @inject(PostService) private readonly postService: PostService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Comment>,
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(CommentsService) private readonly commentsService: CommentsService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.Post>>,
  ) => {
    const {
      query: { sortBy, sortDirection, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy, sortDirection);

    const data = await this.postQueryRepository.getWithPagination();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response<ViewModels.Post>) => {
    const {
      params: { id },
    } = req;

    const result = await this.postQueryRepository.getById(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(result);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.PostCreateAndUpdate>, res: Response<ViewModels.Post>) => {
    const { body: entity } = req;

    const result = await this.postService.create(entity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.PostCreateAndUpdate>,
    res: Response<ViewModels.Post>,
  ) => {
    const {
      params: { id },
      body: entity,
    } = req;

    const result = await this.postService.update(String(id), entity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      params: { id },
    } = req;

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
    this.sortingService.setValue(sortBy, sortDirection);
    this.filterService.setValue("postId", id, FiltersType.ById);

    const data = await this.commentsQueryRepository.getWithPagination(user?.id);

    if (!data.items.length) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(data);
  };

  public createComment = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.Comment>,
    res: Response<ViewModels.Comment>,
  ) => {
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

export default PostController;
