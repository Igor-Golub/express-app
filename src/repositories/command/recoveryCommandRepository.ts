import { add } from "date-fns";
import { RecoveryModel } from "../../application/db/models";
import mainConfig from "../../configs/mainConfig";
import { RecoveryStatus } from "../../enums/Recovery";

class RecoveryCommandRepository {
  public async create(userId: string, code: string) {
    const expirationDate = add(new Date(), {
      hours: mainConfig.recovery.expirationDate,
    });

    return new RecoveryModel({
      code,
      userId,
      expirationDate,
      status: RecoveryStatus.InProgress,
    });
  }

  public async getRecoveryByCode(code: string) {
    return RecoveryModel.findOne({
      code,
    }).lean();
  }

  public async updateStatus(code: string, status: RecoveryStatus) {
    const recovery = await RecoveryModel.findOne({
      code,
    });

    if (!recovery) return null;

    recovery.status = status;

    await recovery.save();

    return true;
  }
}

export default new RecoveryCommandRepository();
