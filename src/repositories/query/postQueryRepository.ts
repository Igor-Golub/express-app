import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";
import { PostsModel } from "../../application/db/models";

class PostQueryRepository implements Base.QueryRepository<ViewModels.Post> {
  constructor(
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Post>,
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

    const result = await PostsModel.find(filters)
      .sort(sort)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

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

export default new PostQueryRepository(PaginationService, SortingService, FilterService);
