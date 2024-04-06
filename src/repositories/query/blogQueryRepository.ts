import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";
import { BlogModel } from "../../application/db/models";

class BlogQueryRepository {
  constructor(
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Blog>,
  ) {}

  public async getById(id: string) {
    const result = await BlogModel.findById(id);

    if (!result) return null;

    return this.mapToViewModels([result])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await BlogModel.find(filters)
      .sort(sort)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .lean();

    const collectionLength = await BlogModel.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Blog>[]): ViewModels.Blog[] {
    return data.map(({ _id, name, isMembership, websiteUrl, description }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      name,
      isMembership,
      websiteUrl,
      description,
    }));
  }
}

export default new BlogQueryRepository(PaginationService, SortingService, FilterService);
