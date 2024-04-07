import { RecoveryModel } from "../../application/db/models";

class RecoveryCommandRepository {
  public async create(userId: string, code: string) {
    return RecoveryModel.create({
      userId,
      code,
      isRecovered: false,
    });
  }

  public async confirm(code: string) {
    return RecoveryModel.findOneAndUpdate({ code }, { isRecovered: true }).lean();
  }
}

export default new RecoveryCommandRepository();
