import { Authorization, TokensType } from "../enums/Authorization";
import mainConfig from "../configs/mainConfig";
import JWTService from "./jwtService";
import UserCommandRepository from "../repositories/command/userCommandRepository";
import AuthSessionCommandRepository from "../repositories/command/authSessionCommandRepository";
import { isString } from "../utils/typesCheck";

class AuthService {
  constructor(
    private readonly jwtService: typeof JWTService,
    private readonly userCommandRepository: typeof UserCommandRepository,
    private readonly authSessionCommandRepository: typeof AuthSessionCommandRepository,
  ) {}

  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== Authorization.Basic) return false;

    return mainConfig.rootUser.password === secretToken;
  }

  public async jwtAccessVerification(token: string) {
    const [authorizationType, tokenPart] = token.split(" ");

    if (authorizationType !== Authorization.Bearer) return null;

    const result = this.jwtService.verify(tokenPart, TokensType.Access);

    if (!result) return null;

    const user = await this.userCommandRepository.findUserByLogin(result?.userLogin);

    if (!user) return null;

    return user;
  }

  public async jwtRefreshVerification(token: string) {
    const result = this.jwtService.verify(token, TokensType.Refresh);

    if (!result) return null;

    const entity = await this.authSessionCommandRepository.checkIsTokenValid(Number(result.exp));

    return entity ?? null;
  }
}

export default new AuthService(JWTService, UserCommandRepository, AuthSessionCommandRepository);
