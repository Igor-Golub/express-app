import { inject, injectable } from "inversify";
import CommentsCommandRepo from "../infrastructure/commentsCommandRepo";
import UserCommandRepo from "../../user/infrastructure/userCommandRepo";

@injectable()
class CommentsService {
  constructor(
    @inject(CommentsCommandRepo) private readonly commentsCommandRepo: CommentsCommandRepo,
    @inject(UserCommandRepo) private readonly userCommandRepo: UserCommandRepo,
  ) {}

  public async create(comment: DTO.Comment, userId: string, postId: string) {
    const user = await this.userCommandRepo.findUserById(userId);

    if (!user) return null;

    const newComment: DBModels.Comment = {
      postId,
      ...comment,
      commentatorInfo: {
        userId,
        userLogin: user.login,
      },
    };

    return this.commentsCommandRepo.create(newComment);
  }

  public async update(id: string, entity: DTO.Comment) {
    return this.commentsCommandRepo.update(id, entity);
  }

  public async delete(id: string) {
    return this.commentsCommandRepo.delete(id);
  }
}

export default CommentsService;
