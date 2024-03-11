import { AuthorizationTypes } from "../enums/AuthorizationTypes";
import mainConfig from "../configs/mainConfig";
import JWTService from "./jwtService";

class AuthService {
  constructor(private readonly jwtService: typeof JWTService) {}

  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Basic) return false;

    return mainConfig.rootUser.password === secretToken;
  }

  public async jwtVerification(token: string) {
    const [authorizationType, accessToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Bearer) return false;

    return this.jwtService.verifyByAccessToken(accessToken);
  }
}

export default new AuthService(JWTService);
