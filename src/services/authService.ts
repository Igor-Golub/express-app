import { AuthorizationTypes } from "../enums/AuthorizationTypes";
import dotenv from "dotenv";

dotenv.config();

class AuthService {
  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Basic) return false;

    return process.env.ROOT_USER_PASSWORD === secretToken;
  }
}

export default new AuthService();
