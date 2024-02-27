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
    const { hash, salt } = await this.authService.createSaltAndHash(password);

    return this.userCommandRepository.create({
      login,
      email,
      salt,
      hash,
    });
  }

  public async findUserByLoginOrEmail({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userQueryRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    const hash = await this.authService.createHash(password, user.salt);

    return user.hash === hash;
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }
}

export default new UserService(UserCommandRepository, UserQueryRepository, AuthService);
