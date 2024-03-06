import { UserCommandRepository } from "../repositories/command";
import { UserQueryRepository } from "../repositories/query";
import JWTService from "../application/jwtService";
import CryptographyService from "../application/cryptographyService";

class UserService {
  constructor(
    private readonly userCommandRepository: Base.CommandRepository<DBModels.User, ViewModels.User>,
    private readonly userQueryRepository: typeof UserQueryRepository,
    private readonly cryptographyService: typeof CryptographyService,
    private readonly jwtService: typeof JWTService,
  ) {}

  public async createUser({ login, email, password }: DTO.UserCreate) {
    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    return this.userCommandRepository.create({
      login,
      email,
      hash,
    });
  }

  public async login({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userQueryRepository.findUserByLoginOrEmailWithHash(loginOrEmail);

    if (!user) return null;

    const compareResult = this.cryptographyService.compareCredential(password, user.hash);

    if (!compareResult) return null;

    return this.jwtService.generateAccessToken(user.id, user.login);
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }
}

export default new UserService(UserCommandRepository, UserQueryRepository, CryptographyService, JWTService);
