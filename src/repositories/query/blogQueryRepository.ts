import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";
import { BlogModel } from "../../application/db/models";
import { inject, injectable } from "inversify";

@injectable()
class BlogQueryRepository {
  constructor(
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Blog>,
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

    const result = await BlogModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

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

export default BlogQueryRepository;
