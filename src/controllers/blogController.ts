import { Response } from "express";
import BlogService from "../services/blogService";
import { BlogQueryRepository, PostQueryRepository } from "../repositories/query";
import { StatusCodes } from "../enums/StatusCodes";
import SortingService from "../application/sortingService";
import FilterService from "../application/filterService";
import { FiltersType } from "../enums/Filters";
import PaginationService from "../application/paginationService";

class BlogController implements Base.Controller {
  constructor(
    private blogQueryRepository: Base.QueryRepository<ViewModels.Blog>,
    private postsQueryRepository: Base.QueryRepository<ViewModels.Post>,
    private blogService: typeof BlogService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Blog>,
    private paginationService: typeof PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<ViewModels.ResponseWithPagination<ViewModels.Blog>>,
  ) => {
    const {
      query: { sortBy, sortDirection, searchNameTerm, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.filterService.setValue("name", searchNameTerm, FiltersType.InnerText);
    this.sortingService.setValue(sortBy, sortDirection);

    const data = await this.blogQueryRepository.getWithPagination(
      this.sortingService.createSortCondition(),
      this.filterService.getFilters(),
    );

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const entity = await this.blogQueryRepository.getById(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public getPostsByBlogId = async (
    req: Utils.ReqWithParamsAndQuery<Params.URIId, Params.PaginationAndSortingQueryParams>,
    res: Response<ViewModels.ResponseWithPagination<ViewModels.Post>>,
  ) => {
    const {
      params: { id },
      query: { sortBy, sortDirection, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy as keyof ViewModels.Blog, sortDirection);
    this.filterService.setValue("blogId", String(id), FiltersType.ById);

    const data = await this.postsQueryRepository.getWithPagination(
      this.sortingService.createSortCondition(),
      this.filterService.getFilters(),
    );

    if (!data.items.length) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(data);
  };

  public createPostForBlog = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, Omit<DTO.PostCreateAndUpdate, "blogId">>,
    res: Response,
  ) => {
    const {
      params: { id },
      body: entity,
    } = req;

    const result = await this.blogService.createPostForBlog({
      ...entity,
      blogId: String(id),
    });

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Created_201).send(result);
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.BlogCreateAndUpdate>, res: Response) => {
    const entity = req.body;

    const result = await this.blogService.create(entity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.BlogCreateAndUpdate>,
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

export default new BlogController(
  BlogQueryRepository,
  PostQueryRepository,
  BlogService,
  SortingService,
  FilterService,
  PaginationService,
);
