import { AuthorizationTypes } from "../enums/AuthorizationTypes";
import { UserQueryRepository } from "../repositories/query";

class AuthService {
  constructor(private userQueryRepository: typeof UserQueryRepository) {}

  public async basicVerification(token: string) {
    const [authorizationType, secretToken] = token.split(" ");

    if (authorizationType !== AuthorizationTypes.Basic) return false;

    const users = await this.userQueryRepository.get();

    return users.map(({ password }) => password).includes(secretToken);
  }
}

export default new AuthService(UserQueryRepository);
