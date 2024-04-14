import BaseDomainService from "./baseDomainService";
import { JWTService } from "../application";
import { inject, injectable } from "inversify";
import { AuthSessionCommandRepo } from "../repositories/command";

@injectable()
class SessionsService extends BaseDomainService {
  constructor(
    @inject(AuthSessionCommandRepo) private readonly authSessionCommandRepo: AuthSessionCommandRepo,
    @inject(JWTService) private readonly jwtService: JWTService,
  ) {
    super();
  }

  public async removeAll(userId: string, refreshToken: string) {
    const decodeResult = this.jwtService.decode(refreshToken);

    if (!decodeResult || !decodeResult?.iat) return this.innerUnauthorizedResult();

    const userSessions = await this.authSessionCommandRepo.getAllSessionByUserId(userId);

    const removeSessionsIds = userSessions
      .filter(({ version }) => String(version) !== new Date(Number(decodeResult.iat) * 1000).toISOString())
      .map(({ _id }) => _id);

    const result = await this.authSessionCommandRepo.deleteMany(userId, removeSessionsIds);

    if (!result) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }

  public async removeById(userId: string, deviceId: string) {
    const allDeviceSessions = await this.authSessionCommandRepo.getAllSessionByDeviceId(deviceId);

    if (!allDeviceSessions.length) return this.innerNotFoundResult();

    if (!allDeviceSessions.map(({ userId }) => userId).includes(userId)) return this.innerForbiddenResult();

    await this.authSessionCommandRepo.delete(userId, deviceId);

    return this.innerSuccessResult(true);
  }
}

export default SessionsService;
