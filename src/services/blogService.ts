import BaseRepository from "../repositories/baseRepository";

class BlogService {
  constructor(private blogRepository: BaseRepository<Contracts.BlogModel>) {}

  public get() {
    return this.blogRepository.get();
  }

  public getId(id: string) {
    return this.blogRepository.getId(id);
  }

  public create(blogEntity: Contracts.BlogModelCreateDTO) {
    return this.blogRepository.create(blogEntity);
  }

  public update(id: string, blogEntity: Contracts.BlogModelUpdateDTO) {
    const currentElement = this.blogRepository.getId(id);

    if (!currentElement) return null;

    const newEntity: Contracts.BlogModel = {
      ...currentElement,
      ...blogEntity,
    };

    return this.blogRepository.update(id, newEntity);
  }

  public delete(id: string) {
    if (!this.blogRepository.getId(id)) return false;

    this.blogRepository.delete(id);

    return true;
  }
}

export default BlogService;
