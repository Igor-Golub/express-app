import UserService from "./userService";
import { AuthorizationTypes } from "../enums/AuthorizationTypes";

class AuthService {
  constructor(private userService: UserService) {}

  public basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Basic) return false;

    const users = this.userService.get();

    return users.map(({ password }) => password).includes(secretToken);
  }
}

export default AuthService;
