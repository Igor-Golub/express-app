import { PostCommandRepository } from "../repositories/command";
import { BlogQueryRepository } from "../repositories/query";

class PostService {
  constructor(
    private postCommandRepository: Base.CommandRepository<DBModels.Post, ViewModels.Post>,
    private blogQueryRepository: Base.QueryRepository<ViewModels.Blog>,
  ) {}

  public async create(postEntity: DTO.PostCreateAndUpdate) {
    const blogEntity = await this.blogQueryRepository.getById(postEntity.blogId);

    if (!blogEntity?.name) return null;

    const newEntity: DBModels.Post = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postCommandRepository.create(newEntity);
  }

  public async update(id: string, postEntity: DTO.PostCreateAndUpdate) {
    return this.postCommandRepository.update(id, postEntity);
  }

  public async delete(id: string) {
    return this.postCommandRepository.delete(id);
  }
}

export default new PostService(PostCommandRepository, BlogQueryRepository);
