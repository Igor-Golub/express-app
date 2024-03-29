import jwt from "jsonwebtoken";
import mainConfig from "../configs/mainConfig";
import { TokensType } from "../enums/Authorization";
import { isString } from "../utils/typesCheck";

class JwtService {
  private secrets = {
    [TokensType.Access]: mainConfig.jwt.accessSecret,
    [TokensType.Refresh]: mainConfig.jwt.refreshSecret,
  };

  public generateTokenPare(userId: string, userLogin: string) {
    return {
      access: jwt.sign(
        {
          userId,
          userLogin,
        },
        this.secrets.access,
        {
          expiresIn: mainConfig.jwt.accessLifeTime,
        },
      ),
      refresh: jwt.sign(
        {
          userId,
          userLogin,
        },
        this.secrets.refresh,
        {
          expiresIn: mainConfig.jwt.refreshLifeTime,
        },
      ),
    };
  }

  public verify(token: string, type: TokensType) {
    try {
      const result = jwt.verify(token, this.secrets[type]);

      if (!result || isString(result)) return null;

      return result;
    } catch {
      return null;
    }
  }
}

export default new JwtService();
