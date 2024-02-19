import { UserCommandRepository } from "../repositories/command";

class UserService {
  constructor(private userCommandRepository: Base.CommandRepository<Models.UserModel>) {}

  public async create(entity: Models.UserModel) {
    return this.userCommandRepository.create(entity);
  }
}

export default new UserService(UserCommandRepository);
