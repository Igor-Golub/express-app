import { Response } from "express";
import { inject, injectable } from "inversify";
import { BlogService } from "../services";
import { StatusCodes, FiltersType } from "../enums";
import { BlogQueryRepo, PostQueryRepo } from "../repositories/query";
import { SortingService, FilterService, PaginationService } from "../application";

@injectable()
class BlogController implements Base.Controller {
  constructor(
    @inject(BlogQueryRepo) private readonly blogQueryRepo: BlogQueryRepo,
    @inject(PostQueryRepo) private readonly postsQueryRepo: PostQueryRepo,
    @inject(BlogService) private readonly blogService: BlogService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Blog>,
    @inject(PaginationService) private readonly paginationService: PaginationService,
  ) {}

  public getAll = async (
    req: Utils.ReqWithQuery<Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.Blog>>,
  ) => {
    const {
      query: { sortBy, sortDirection, searchNameTerm, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.filterService.setValue("name", searchNameTerm, FiltersType.InnerText);
    this.sortingService.setValue(sortBy, sortDirection);

    const data = await this.blogQueryRepo.getWithPagination();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response<ViewModels.Blog>) => {
    const {
      params: { id },
    } = req;

    const entity = await this.blogQueryRepo.getById(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public getPostsByBlogId = async (
    req: Utils.ReqWithParamsAndQuery<Params.URIId, Params.PaginationAndSortingQueryParams>,
    res: Response<Base.ResponseWithPagination<ViewModels.Post>>,
  ) => {
    const {
      params: { id },
      query: { sortBy, sortDirection, pageSize, pageNumber },
    } = req;

    this.paginationService.setValues({ pageSize, pageNumber });
    this.sortingService.setValue(sortBy as keyof ViewModels.Blog, sortDirection);
    this.filterService.setValue("blogId", String(id), FiltersType.ById);

    const data = await this.postsQueryRepo.getWithPagination();

    if (!data.items.length) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(data);
  };

  public createPostForBlog = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, Omit<DTO.PostCreateAndUpdate, "blogId">>,
    res: Response<ViewModels.Post>,
  ) => {
    const {
      params: { id },
      body: entity,
    } = req;

    const blog = await this.blogQueryRepo.getById(String(id));

    if (!blog) res.status(StatusCodes.NotFound_404).end();
    else {
      const result = await this.blogService.createPostForBlog({
        ...entity,
        blogId: String(id),
      });

      if (!result) res.status(StatusCodes.BadRequest_400).end();
      else res.status(StatusCodes.Created_201).send(result);
    }
  };

  public create = async (req: Utils.ReqWithReqBody<DTO.BlogCreateAndUpdate>, res: Response<ViewModels.Blog>) => {
    const { body: entity } = req;

    const result = await this.blogService.create(entity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Created_201).send(result);
  };

  public update = async (
    req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.BlogCreateAndUpdate>,
    res: Response,
  ) => {
    const {
      params: { id },
      body: blogEntity,
    } = req;

    const result = await this.blogService.update(String(id), blogEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      params: { id },
    } = req;

    const result = await this.blogService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default BlogController;
