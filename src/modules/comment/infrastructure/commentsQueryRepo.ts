import { inject, injectable } from "inversify";
import { LikeStatus } from "../../../enums";
import { FilterService, PaginationService, SortingService } from "../../../application";
import { CommentsModel } from "../domain/commentsSchema";
import { CommentsLikesModel } from "../domain/commentsLikesSchema";

@injectable()
class CommentsQueryRepo {
  constructor(
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(SortingService) private readonly sortingService: Base.SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Comment>,
  ) {}

  public async getById(commentId: string, userId?: string) {
    const result = await CommentsModel.findOne({ _id: commentId });

    if (!result) return null;

    const commentsLikes = await CommentsLikesModel.find({ commentId });

    return this.mapToViewModel(result, commentsLikes, userId);
  }

  public async getWithPagination(userId?: string) {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await CommentsModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

    const collectionLength = await CommentsModel.countDocuments(filters);

    const commentsLikes = await CommentsLikesModel.find({
      commentId: { $in: result.map(({ _id }) => _id.toString()) },
    });

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: result.map((item) => this.mapToViewModel(item, commentsLikes, userId)),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModel(
    comment: DBModels.MongoResponseEntity<DBModels.Comment>,
    commentsLikes: DBModels.MongoResponseEntity<DBModels.CommentsLikes>[],
    reqUserId: string | undefined,
  ): ViewModels.Comment {
    const {
      _id,
      content,
      commentatorInfo: { userId: commentatorInfoUserId, userLogin },
    } = comment;

    return {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content,
      commentatorInfo: { userId: commentatorInfoUserId, userLogin },
      likesInfo: commentsLikes
        .filter(({ commentId }) => commentId === _id.toString())
        .reduce<ViewModels.LikesInfo>(
          (acc, { status, userId }) => {
            if (status === LikeStatus.Like) acc.likesCount += 1;
            if (status === LikeStatus.Dislike) acc.dislikesCount += 1;
            if (reqUserId && reqUserId === userId) acc.myStatus = status;

            return acc;
          },
          {
            likesCount: 0,
            dislikesCount: 0,
            myStatus: LikeStatus.None,
          },
        ),
    };
  }
}

export default CommentsQueryRepo;
