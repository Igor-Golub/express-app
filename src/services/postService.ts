import BaseRepository from "../repositories/baseRepository";

class PostService {
  constructor(
    private postRepository: BaseRepository<Contracts.PostModel>,
    private blogRepository: BaseRepository<Contracts.BlogModel>,
  ) {}

  public get() {
    return this.postRepository.get();
  }

  public getId(id: string) {
    return this.postRepository.getId(id);
  }

  public create(postEntity: Contracts.PostModelCreateAndUpdateDTO) {
    const blogEntity = this.blogRepository.getId(postEntity.blogId);

    const newEntity: Contracts.PostModel = {
      ...postEntity,
      blogName: blogEntity.name,
    };

    return this.postRepository.create(newEntity);
  }

  public update(id: string, postEntity: Contracts.PostModelCreateAndUpdateDTO) {
    const currentElement = this.postRepository.getId(id);

    if (!currentElement) return null;

    const newEntity: Contracts.PostModel = {
      ...currentElement,
      ...postEntity,
    };

    return this.postRepository.update(id, newEntity);
  }

  public delete(id: string) {
    if (!this.postRepository.getId(id)) return false;

    this.postRepository.delete(id);

    return true;
  }
}

export default PostService;
