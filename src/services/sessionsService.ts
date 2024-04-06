import BaseDomainService from "./baseDomainService";
import { AuthSessionCommandRepository } from "../repositories/command";
import { JWTService } from "../application";

class SessionsService extends BaseDomainService {
  constructor(
    private readonly authSessionCommandRepository: typeof AuthSessionCommandRepository,
    private readonly jwtService: typeof JWTService,
  ) {
    super();
  }

  public async removeAll(userId: string, refreshToken: string) {
    const decodeResult = this.jwtService.decode(refreshToken);

    if (!decodeResult || !decodeResult?.iat) return this.innerUnauthorizedResult();

    const userSessions = await this.authSessionCommandRepository.getAllSessionByUserId(userId);

    const removeSessionsIds = userSessions
      .filter(({ version }) => String(version) !== new Date(Number(decodeResult.iat) * 1000).toISOString())
      .map(({ _id }) => _id);

    const result = await this.authSessionCommandRepository.deleteMany(userId, removeSessionsIds);

    if (!result) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }

  public async removeById(userId: string, deviceId: string) {
    const allDeviceSessions = await this.authSessionCommandRepository.getAllSessionByDeviceId(deviceId);

    if (!allDeviceSessions.length) return this.innerNotFoundResult();

    if (!allDeviceSessions.map(({ userId }) => userId).includes(userId)) return this.innerForbiddenResult();

    await this.authSessionCommandRepository.delete(userId, deviceId);

    return this.innerSuccessResult(true);
  }
}

export default new SessionsService(AuthSessionCommandRepository, JWTService);
