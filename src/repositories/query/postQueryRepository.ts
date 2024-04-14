import { inject, injectable } from "inversify";
import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";
import { PostsModel } from "../../application/db/models";

@injectable()
class PostQueryRepository implements Base.QueryRepository<ViewModels.Post> {
  constructor(
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(SortingService) private readonly sortingService: SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Post>,
  ) {}

  public async getById(id: string) {
    const result = await PostsModel.findOne({ _id: id }).lean();

    if (!result) return null;

    return this.mapToViewModels([result])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await PostsModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

    const collectionLength = await PostsModel.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Post>[]): ViewModels.Post[] {
    return data.map(({ _id, content, blogName, blogId, title, shortDescription }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content,
      blogName,
      blogId,
      title,
      shortDescription,
    }));
  }
}

export default PostQueryRepository;
