import { inject, injectable } from "inversify";
import PaginationService from "../../application/paginationService";
import SortingService from "../../application/sortingService";
import FilterService from "../../application/filterService";
import { PostsLikesModel, PostsModel } from "../../application/db/models";
import { LikeStatus } from "../../enums";
import { isBefore } from "date-fns";

@injectable()
class PostQueryRepository {
  constructor(
    @inject(PaginationService) private readonly paginationService: PaginationService,
    @inject(SortingService) private readonly sortingService: SortingService,
    @inject(FilterService) private readonly filterService: Base.FilterService<ViewModels.Post>,
  ) {}

  public async getById(id: string, userId?: string) {
    const result = await PostsModel.findOne({ _id: id }).lean();

    if (!result) return null;

    const postLikes = await PostsLikesModel.find({
      postId: result._id.toString(),
    });

    return this.mapToViewModels([result], postLikes, userId)[0];
  }

  public async getWithPagination(userId?: string) {
    const { pageNumber, pageSize } = this.paginationService.getPagination();
    const sort = this.sortingService.createSortCondition();
    const filters = this.filterService.getFilters();

    const result = await PostsModel.getListWithPaginationAndSorting(filters, sort, { pageNumber, pageSize });

    const collectionLength = await PostsModel.countDocuments(filters);

    const postLikes = await PostsLikesModel.find({
      postId: { $in: result.map(({ _id }) => _id.toString()) },
    });

    return {
      page: pageNumber,
      pageSize,
      totalCount: collectionLength,
      items: this.mapToViewModels(result, postLikes, userId),
      pagesCount: Math.ceil(collectionLength / pageSize),
    };
  }

  private mapToViewModels(
    data: DBModels.MongoResponseEntity<DBModels.Post>[],
    postLikes: DBModels.PostsLikes[],
    reqUserId: string | undefined,
  ): ViewModels.PostWithFullLikes[] {
    return data.map(({ _id, content, blogName, blogId, title, shortDescription }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      content,
      blogName,
      blogId,
      title,
      shortDescription,
      extendedLikesInfo: postLikes.reduce<ViewModels.ExtendedLikesInfo>(
        (acc, { status, userId, createdAt, postId, login }) => {
          if (_id.toString() !== postId) return acc;

          if (status === LikeStatus.Like) acc.likesCount += 1;
          if (status === LikeStatus.Dislike) acc.dislikesCount += 1;
          if (reqUserId && reqUserId === userId) acc.myStatus = status;

          if (
            acc.newestLikes.length < 3 ||
            acc.newestLikes.find(({ addedAt }) => createdAt && isBefore(addedAt, createdAt?.toString()))
          ) {
            acc.newestLikes.push({
              addedAt: new Date(createdAt!.toString()).toISOString(),
              userId,
              login,
            });
          }

          return acc;
        },
        {
          likesCount: 0,
          dislikesCount: 0,
          newestLikes: [],
          myStatus: LikeStatus.None,
        },
      ),
    }));
  }
}

export default PostQueryRepository;
