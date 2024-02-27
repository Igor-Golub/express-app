import { AuthorizationTypes } from "../enums/AuthorizationTypes";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

class AuthService {
  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Basic) return false;

    return process.env.ROOT_USER_PASSWORD === secretToken;
  }

  public async createSaltAndHash(password: string) {
    const salt = await this.createSalt();
    const hash = await this.createHash(password, salt);

    return { salt, hash };
  }

  private async createSalt() {
    return bcrypt.genSalt(10);
  }

  public async createHash(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }
}

export default new AuthService();
