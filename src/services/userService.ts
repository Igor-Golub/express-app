import { UserCommandRepository } from "../repositories/command";

class UserService {
  constructor(private userCommandRepository: Base.CommandRepository<DBModels.User, ViewModels.User>) {}

  public async create(entity: DBModels.User) {
    return this.userCommandRepository.create(entity);
  }
}

export default new UserService(UserCommandRepository);
