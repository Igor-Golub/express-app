import PaginationService from "../../application/paginationService";
import { CommentsModel } from "../../application/db/models";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";

class CommentsQueryRepository implements Base.QueryRepository<ViewModels.Comment> {
  constructor(
    private paginationService: typeof PaginationService,
    private sortingService: Base.SortingService,
    private filterService: Base.FilterService<ViewModels.Comment>,
  ) {}

  public async getById(id: string) {
    const result = await CommentsModel.findOne({ _id: id });

    if (!result) return null;

    return this.mapToViewModels([result])[0];
  }

  public async getWithPagination() {
    const { pageNumber, pageSize } = this.paginationService.value;
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await CommentsModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

    const collectionLength = await CommentsModel.countDocuments(filters);

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(data: DBModels.MongoResponseEntity<DBModels.Comment>[]): ViewModels.Comment[] {
    return data.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content: entity.content,
      commentatorInfo: entity.commentatorInfo,
    }));
  }
}

export default new CommentsQueryRepository(PaginationService, SortingService, FilterService);
