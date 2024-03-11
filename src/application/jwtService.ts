import jwt from "jsonwebtoken";
import mainConfig from "../configs/mainConfig";

class JwtService {
  public generateAccessToken(userId: string, userLogin: string) {
    return jwt.sign({ userId, userLogin }, mainConfig.jwtSecret, { expiresIn: "1h" });
  }

  public verifyByAccessToken(token: string) {
    try {
      return jwt.verify(token, mainConfig.jwtSecret);
    } catch {
      return false;
    }
  }
}

export default new JwtService();
