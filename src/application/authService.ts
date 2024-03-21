import { Authorization, TokensType } from "../enums/Authorization";
import mainConfig from "../configs/mainConfig";
import JWTService from "./jwtService";
import { UserQueryRepository } from "src/repositories/query";

class AuthService {
  constructor(
    private readonly jwtService: typeof JWTService,
    private readonly userQueryRepository: typeof UserQueryRepository,
  ) {}

  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== Authorization.Basic) return false;

    return mainConfig.rootUser.password === secretToken;
  }

  public async jwtVerification(token: string) {
    const [authorizationType, accessToken] = token.split(" ");

    if (authorizationType !== Authorization.Bearer) return false;

    const result = this.jwtService.verify(accessToken, TokensType.Access);

    if (!result || typeof result === "string") return false;

    const user = await this.userQueryRepository.findUserByLoginOrEmail(result?.userLogin);

    if (!user) return false;

    return user;
  }
}

export default new AuthService(JWTService, UserQueryRepository);
