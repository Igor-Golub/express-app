import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { TokensType } from "../enums";
import { isString } from "../utils/typesCheck";
import mainConfig from "../configs/mainConfig";

@injectable()
class JwtService {
  private secrets = {
    [TokensType.Access]: mainConfig.jwt.accessSecret,
    [TokensType.Refresh]: mainConfig.jwt.refreshSecret,
  };

  public generatePairTokens({ userId, login, deviceId }: { userId: string; login: string; deviceId: string }) {
    return {
      access: jwt.sign(
        {
          userId,
          login,
          deviceId,
        },
        this.secrets.access,
        {
          expiresIn: mainConfig.jwt.accessLifeTime,
        },
      ),
      refresh: jwt.sign(
        {
          userId,
          login,
          deviceId,
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

  public decode(token: string) {
    const result = jwt.decode(token);

    if (!result || isString(result)) return null;

    return result;
  }
}

export default JwtService;
