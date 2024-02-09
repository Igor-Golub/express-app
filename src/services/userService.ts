import BaseRepository from "../repositories/baseRepository";

class UserService {
  constructor(private blogRepository: BaseRepository<Contracts.UserModel>) {}

  public get() {
    return this.blogRepository.get();
  }

  public getByName(name: string) {
    return this.blogRepository.getByName?.(name) ?? null;
  }
}

export default UserService;
