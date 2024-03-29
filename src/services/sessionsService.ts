import BaseDomainService from "./baseDomainService";
import { AuthSessionCommandRepository } from "../repositories/command";

class SessionsService extends BaseDomainService {
  constructor(private readonly authSessionCommandRepository: typeof AuthSessionCommandRepository) {
    super();
  }

  public async removeAll(userId: string) {
    const result = await this.authSessionCommandRepository.deleteMany(userId);

    if (!result) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }

  public async removeById(userId: string, sessionId: string) {
    const { deletedCount } = await this.authSessionCommandRepository.delete(userId, sessionId);

    if (!deletedCount) return this.innerNotFoundResult();
    return this.innerSuccessResult(true);
  }
}

export default new SessionsService(AuthSessionCommandRepository);
