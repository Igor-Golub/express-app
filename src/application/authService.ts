import { inject, injectable } from "inversify";
import { Authorization, TokensType } from "../enums";
import mainConfig from "../configs/mainConfig";
import JWTService from "./jwtService";
import UserCommandRepo from "../modules/user/infrastructure/userCommandRepo";
import AuthSessionCommandRepo from "../modules/auth/infrastructure/authSessionCommandRepo";

@injectable()
class AuthService {
  constructor(
    @inject(JWTService) private readonly jwtService: JWTService,
    @inject(UserCommandRepo) private readonly userCommandRepo: UserCommandRepo,
    @inject(AuthSessionCommandRepo) private readonly authSessionCommandRepo: AuthSessionCommandRepo,
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

    const user = await this.userCommandRepo.findUserByLogin(result?.login);

    if (!user) return null;

    return user;
  }

  public async jwtRefreshVerification(token: string) {
    const result = this.jwtService.verify(token, TokensType.Refresh);

    if (!result || !result?.iat) return null;

    const entity = await this.authSessionCommandRepo.checkIsTokenValid(new Date(result.iat * 1000).toISOString());

    return entity ?? null;
  }
}

export default AuthService;
