import { v4 as uuidv4 } from "uuid";
import { add, isAfter, isBefore } from "date-fns";
import { UserCommandRepository } from "../repositories/command";
import JWTService from "../application/jwtService";
import CryptographyService from "../application/cryptographyService";
import NotifyManager from "../managers/NotifyManager";
import mainConfig from "../configs/mainConfig";
import generateInnerResult from "../utils/generateInnerResult";
import { ErrorMessages, ResultStatuses } from "../enums/Inner";

class UserService {
  constructor(
    private readonly userCommandRepository: typeof UserCommandRepository,
    private readonly cryptographyService: typeof CryptographyService,
    private readonly jwtService: typeof JWTService,
    private readonly notifyManager: typeof NotifyManager,
  ) {}

  public async createUser({ login, email, password }: DTO.UserCreate | DTO.Registration) {
    const result = await this.checkUserExisting(login, email);

    if (result.status) return result;

    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    await this.userCommandRepository.create({
      login,
      email,
      hash,
      confirmation: { isConfirmed: true, code: "", expirationDate: new Date() },
    });

    return generateInnerResult(ResultStatuses.Success, { data: true });
  }

  public async registerUser({ login, email, password }: DTO.UserCreate | DTO.Registration) {
    const result = await this.checkUserExisting(login, email);

    if (result.status) return result;

    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    const confirmationCode = uuidv4();

    await this.createUserInRepository(login, email, hash, confirmationCode);

    await this.notifyManager.sendRegistrationEmail(login, email, confirmationCode);

    return generateInnerResult(ResultStatuses.Success, { data: true });
  }

  public async confirmUser(confirmationCode: string) {
    const user = await this.userCommandRepository.findUserByConfirmationCode(confirmationCode);

    if (!user || user.confirmation.isConfirmed || isAfter(new Date(), user.confirmation.expirationDate)) return false;

    await this.userCommandRepository.confirmUser(user._id);

    return true;
  }

  public async login({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userCommandRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    const compareResult = this.cryptographyService.compareCredential(password, user.hash);

    if (!compareResult) return null;

    return this.jwtService.generateAccessToken(user._id.toString(), user.login);
  }

  public async resendConfirmationCode(email: string) {
    const user = await this.userCommandRepository.findUserByLoginOrEmail(email);

    if (!user || user.confirmation.isConfirmed || isBefore(new Date(), user.confirmation.expirationDate)) return false;

    const confirmationCode = uuidv4();

    await this.userCommandRepository.updateConfirmationCode(user._id, confirmationCode);

    await this.notifyManager.sendRegistrationEmail(user.login, email, confirmationCode);

    return true;
  }

  public async delete(id: string) {
    return this.userCommandRepository.delete(id);
  }

  private async createUserInRepository(login: string, email: string, hash: string, confirmationCode: string) {
    return this.userCommandRepository.create({
      login,
      email,
      hash,
      confirmation: {
        isConfirmed: false,
        code: confirmationCode,
        expirationDate: add(new Date(), {
          minutes: mainConfig.registration.expirationDateTimeout,
        }),
      },
    });
  }

  private async checkUserExisting(login: string, email: string) {
    const isUserWithLoginExist = await this.userCommandRepository.findUserByEmail(login);
    const isUserWithEmailExist = await this.userCommandRepository.findUserByEmail(email);

    if (isUserWithLoginExist) {
      return generateInnerResult(ResultStatuses.Forbidden, {
        errorMessage: ErrorMessages.LoginAlreadyExist,
        field: "login",
        data: false,
      });
    }

    if (isUserWithEmailExist) {
      return generateInnerResult(ResultStatuses.Forbidden, {
        errorMessage: ErrorMessages.EmailAlreadyExist,
        field: "email",
        data: false,
      });
    }

    return generateInnerResult(ResultStatuses.Success, { data: true });
  }
}

export default new UserService(UserCommandRepository, CryptographyService, JWTService, NotifyManager);
