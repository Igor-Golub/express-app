import BaseDomainService from "./baseDomainService";
import { AuthSessionCommandRepository } from "../repositories/command";

class SessionsService extends BaseDomainService {
  constructor(private readonly authSessionCommandRepository: typeof AuthSessionCommandRepository) {
    super();
  }

  public async removeAll(userId: string, currentSessionId: string) {
    const userSessions = await this.authSessionCommandRepository.getAllSessionByUserId(userId);

    const removeSessionsIds = userSessions
      .filter(({ version }) => String(version) !== currentSessionId)
      .map(({ _id }) => _id);

    const result = await this.authSessionCommandRepository.deleteMany(userId, removeSessionsIds);

    if (!result) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }

  public async removeById(userId: string, deviceId: string) {
    const { deletedCount } = await this.authSessionCommandRepository.delete(userId, deviceId);

    if (!deletedCount) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }
}

export default new SessionsService(AuthSessionCommandRepository);
