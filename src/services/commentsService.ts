import { CommentsCommandRepository } from "../repositories/command";

class CommentsService {
  constructor(
    private readonly commentsCommandRepository: Base.CommandRepository<DBModels.Comment, ViewModels.Comment>,
  ) {}

  public async create(comment: DTO.Comment, userId: string, userLogin: string, postId: string) {
    const newComment: DBModels.Comment = {
      postId,
      ...comment,
      commentatorInfo: {
        userId,
        userLogin,
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

export default new CommentsService(CommentsCommandRepository);
