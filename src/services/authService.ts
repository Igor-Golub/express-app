import UserService from "./userService";

class AuthService {
  constructor(private userService: UserService) {}

  public basicVerification(token: string) {
    const { userName, userPassword } = this.decodeTokenFromBase64(token);

    const user = this.userService.getByName(userName);

    return user?.password === userPassword;
  }

  private decodeTokenFromBase64(token: string) {
    const [, userPassword] = token.split(" ");

    const secret = Buffer.from(userPassword, "base64").toString("ascii");

    const [userName] = secret.split(":");

    return {
      userName,
      userPassword,
    };
  }
}

export default AuthService;
