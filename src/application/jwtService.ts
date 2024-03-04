import jwt from "jsonwebtoken";
import mainConfig from "../configs/mainConfig";

class JwtService {
  public generateAccessToken(userId: string) {
    return jwt.sign(userId, mainConfig.jwtSecret, { expiresIn: "1h" });
  }

  public verifyByAccessToken(token: string) {
    return jwt.verify(token, mainConfig.jwtSecret);
  }
}

export default new JwtService();
