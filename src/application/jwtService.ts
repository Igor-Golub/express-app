import jwt from "jsonwebtoken";
import mainConfig from "../configs/mainConfig";
import { TokensType } from "../enums/Authorization";

class JwtService {
  private secrets = {
    [TokensType.Access]: mainConfig.jwtAccessSecret,
    [TokensType.Refresh]: mainConfig.jwtRefreshSecret,
  };

  public generateAccessToken(userId: string, userLogin: string) {
    return jwt.sign({ userId, userLogin }, this.secrets.access, { expiresIn: "1h" });
  }

  public generateTokenPare(userId: string, userLogin: string) {
    return {
      access: jwt.sign({ userId, userLogin }, this.secrets.access, { expiresIn: "10s" }),
      refresh: jwt.sign({ userId, userLogin }, this.secrets.refresh, { expiresIn: "1m" }),
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
