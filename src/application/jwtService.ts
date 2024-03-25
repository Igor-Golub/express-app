import jwt from "jsonwebtoken";
import mainConfig from "../configs/mainConfig";
import { TokensType } from "../enums/Authorization";

class JwtService {
  private secrets = {
    [TokensType.Access]: mainConfig.jwt.accessSecret,
    [TokensType.Refresh]: mainConfig.jwt.refreshSecret,
  };

  public generateAccessToken(userId: string, userLogin: string) {
    return jwt.sign(
      {
        userId,
        userLogin,
      },
      this.secrets.access,
      {
        expiresIn: mainConfig.jwt.accessLifeTime,
      },
    );
  }

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
      return jwt.verify(token, this.secrets[type]);
    } catch {
      return false;
    }
  }
}

export default new JwtService();
