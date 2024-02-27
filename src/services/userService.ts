import { UserCommandRepository } from "../repositories/command";
import AuthService from "./authService";

class UserService {
  constructor(
    private readonly userCommandRepository: Base.CommandRepository<DBModels.User, ViewModels.User>,
    private readonly authService: typeof AuthService,
  ) {}

  public async createUser({ login, email, password }: DTO.UserCreate) {
    const { hash, salt } = await this.authService.createSaltAndHash(password);

    return this.userCommandRepository.create({
      login,
      email,
      salt,
      hash,
    });
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }
}

export default new UserService(UserCommandRepository, AuthService);
