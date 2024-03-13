import { v4 as uuidv4 } from "uuid";
import { add } from "date-fns";
import { UserCommandRepository } from "../repositories/command";
import { UserQueryRepository } from "../repositories/query";
import JWTService from "../application/jwtService";
import CryptographyService from "../application/cryptographyService";
import NotifyManager from "../managers/NotifyManager";

class UserService {
  constructor(
    private readonly userCommandRepository: typeof UserCommandRepository,
    private readonly userQueryRepository: typeof UserQueryRepository,
    private readonly cryptographyService: typeof CryptographyService,
    private readonly jwtService: typeof JWTService,
    private readonly notifyManager: typeof NotifyManager,
  ) {}

  public async createUser({ login, email, password }: DTO.UserCreate | DTO.Registration) {
    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    const confirmationCode = uuidv4();

    await this.userCommandRepository.create({
      login,
      email,
      hash,
      confirmation: {
        isConfirmed: false,
        code: confirmationCode,
        expirationDate: add(new Date(), { minutes: 3 }),
      },
    });

    await this.notifyManager.sendRegistrationEmail(login, email, confirmationCode);
  }

  public async confirmUser(confirmationCode: string) {
    const user = await this.userQueryRepository.findUserByConfirmationCode(confirmationCode);

    if (!user) return false;

    // TODO add condition of confirmation

    await this.userCommandRepository.confirmUser(user._id);

    return true;
  }

  public async login({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userQueryRepository.findUserByLoginOrEmailWithHash(loginOrEmail);

    if (!user) return null;

    const compareResult = this.cryptographyService.compareCredential(password, user.hash);

    if (!compareResult) return null;

    return this.jwtService.generateAccessToken(user.id, user.login);
  }

  public async resendConfirmationCode(email: string) {
    const user = await this.userQueryRepository.findUserByLoginOrEmail(email);

    if (!user) return null;
    return null;
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }
}

export default new UserService(
  UserCommandRepository,
  UserQueryRepository,
  CryptographyService,
  JWTService,
  NotifyManager,
);
