import { UserCommandRepository } from "../repositories/command";
import { UserQueryRepository } from "../repositories/query";
import AuthService from "./authService";

class UserService {
  constructor(
    private readonly userCommandRepository: Base.CommandRepository<DBModels.User, ViewModels.User>,
    private readonly userQueryRepository: typeof UserQueryRepository,
    private readonly authService: typeof AuthService,
  ) {}

  public async createUser({ login, email, password }: DTO.UserCreate) {
    const { hash } = await this.authService.createSaltAndHash(password);

    return this.userCommandRepository.create({
      login,
      email,
      hash,
    });
  }

  public async findUserByLoginOrEmail({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userQueryRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    return this.authService.compareCredential(password, user.hash);
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }
}

export default new UserService(UserCommandRepository, UserQueryRepository, AuthService);
