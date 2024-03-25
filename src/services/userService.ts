import { v4 as uuidv4 } from "uuid";
import { add, isAfter } from "date-fns";
import { UserCommandRepository } from "../repositories/command";
import JWTService from "../application/jwtService";
import CryptographyService from "../application/cryptographyService";
import NotifyManager from "../managers/NotifyManager";
import mainConfig from "../configs/mainConfig";
import generateInnerResult from "../utils/generateInnerResult";
import { ErrorMessages, ResultStatuses } from "../enums/Inner";
import { WithId } from "mongodb";
import { TokensType } from "../enums/Authorization";
import { isString } from "../utils/typesCheck";
import BaseDomainService from "./baseDomainService";
import BlackListCommandRepository from "../repositories/command/blackListCommandRepository";

class UserService extends BaseDomainService {
  constructor(
    private readonly userCommandRepository: typeof UserCommandRepository,
    private readonly cryptographyService: typeof CryptographyService,
    private readonly jwtService: typeof JWTService,
    private readonly notifyManager: typeof NotifyManager,
    private readonly blackListCommandRepository: typeof BlackListCommandRepository,
  ) {
    super();
  }

  public async createUser({ login, email, password }: DTO.UserCreate | DTO.Registration) {
    const result = await this.checkUserExisting(login, email);

    if (result.status) return result;

    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    const newUser = await this.userCommandRepository.create({
      login,
      email,
      hash,
      confirmation: { isConfirmed: true, code: "", expirationDate: new Date() },
    });

    return this.innerSuccessResult(newUser);
  }

  public async registerUser({ login, email, password }: DTO.UserCreate | DTO.Registration) {
    const result = await this.checkUserExisting(login, email);

    if (result.status) return result;

    const { hash } = await this.cryptographyService.createSaltAndHash(password);

    const confirmationCode = uuidv4();

    await this.createUserInRepository(login, email, hash, confirmationCode);

    await this.notifyManager.sendRegistrationEmail(login, email, confirmationCode);

    return this.innerSuccessResult(true);
  }

  public async confirmUser(confirmationCode: string) {
    const user = await this.userCommandRepository.findUserByConfirmationCode(confirmationCode);

    const result = await this.checkConfirmationCode(user, "code");

    if (result.status) return result;

    await this.userCommandRepository.confirmUser(user!._id);

    return this.innerSuccessResult(true);
  }

  public async login({ loginOrEmail, password }: DTO.Login) {
    const user = await this.userCommandRepository.findUserByLoginOrEmail(loginOrEmail);

    if (!user) return null;

    const compareResult = this.cryptographyService.compareCredential(password, user.hash);

    if (!compareResult) return null;

    return this.innerSuccessResult(this.jwtService.generateTokenPare(user._id.toString(), user.login));
  }

  public async resendConfirmationCode(email: string) {
    const user = await this.userCommandRepository.findUserByLoginOrEmail(email);

    const result = await this.checkConfirmationCode(user, "email");

    if (result.status) return result;

    const confirmationCode = uuidv4();

    await this.userCommandRepository.updateConfirmationCode(user!._id, confirmationCode);

    await this.notifyManager.sendRegistrationEmail(user!.login, email, confirmationCode);

    return this.innerSuccessResult(true);
  }

  public async refreshTokenPairs(refreshToken: string) {
    const isTokenValid = await this.blackListCommandRepository.checkIsTokenValid(refreshToken);

    if (!isTokenValid) return this.innerNotFoundResult();

    const result = this.jwtService.verify(refreshToken, TokensType.Refresh);

    if (!result || isString(result)) return this.innerUnauthorizedResult();

    await this.blackListCommandRepository.create({ token: refreshToken });

    const user = await this.userCommandRepository.findUserByLoginOrEmail(result!.userLogin);

    if (!user) return this.innerUnauthorizedResult();

    return this.innerSuccessResult(this.jwtService.generateTokenPare(user._id.toString(), user.login));
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
    const isUserWithLoginExist = await this.userCommandRepository.findUserByLogin(login);
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

  private async checkConfirmationCode(user: WithId<DBModels.User> | null, type: "email" | "code") {
    if (!user) {
      return generateInnerResult(ResultStatuses.NotFound, {
        data: false,
        errorMessage: ErrorMessages.UserNotFound,
        field: type,
      });
    }

    if (user.confirmation.isConfirmed) {
      return generateInnerResult(ResultStatuses.Forbidden, {
        field: type,
        data: false,
        errorMessage: ErrorMessages.UserAlreadyConfirmed,
      });
    }

    if (isAfter(new Date(), user.confirmation.expirationDate)) {
      return generateInnerResult(ResultStatuses.Forbidden, {
        field: "code",
        data: false,
        errorMessage: ErrorMessages.ConfirmationCodeExpired,
      });
    }

    return generateInnerResult(ResultStatuses.Success, { data: true });
  }
}

export default new UserService(
  UserCommandRepository,
  CryptographyService,
  JWTService,
  NotifyManager,
  BlackListCommandRepository,
);
