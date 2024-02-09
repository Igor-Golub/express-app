import UserService from "./userService";

class AuthService {
  constructor(private userService: UserService) {}

  public basicVerification(token: string) {
    const userPassword = this.getTokenFromToken(token);

    const users = this.userService.get();

    return users.map(({ password }) => password).includes(userPassword);
  }

  private getTokenFromToken(token: string) {
    const [, userPassword] = token.split(" ");

    return userPassword;
  }
}

export default AuthService;
