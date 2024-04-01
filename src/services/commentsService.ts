import { CommentsCommandRepository, UserCommandRepository } from "../repositories/command";

class CommentsService {
  constructor(
    private readonly commentsCommandRepository: Base.CommandRepository<DBModels.Comment, ViewModels.Comment>,
    private readonly userCommandRepository: typeof UserCommandRepository,
  ) {}

  public async create(comment: DTO.Comment, userId: string, postId: string) {
    const user = await this.userCommandRepository.findUserById(userId);

    if (!user) return null;

    const newComment: DBModels.Comment = {
      postId,
      ...comment,
      commentatorInfo: {
        userId,
        userLogin: user.login,
      },
    };

    return this.commentsCommandRepository.create(newComment);
  }

  public async update(id: string, entity: DTO.Comment) {
    return this.commentsCommandRepository.update(id, entity);
  }

  public async delete(id: string) {
    return this.commentsCommandRepository.delete(id);
  }
}

export default new CommentsService(CommentsCommandRepository, UserCommandRepository);
