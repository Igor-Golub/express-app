import { add } from "date-fns";
import { injectable } from "inversify";
import { RecoveryModel } from "../../application/db/models";
import mainConfig from "../../configs/mainConfig";
import { RecoveryStatus } from "../../enums";

@injectable()
class RecoveryCommandRepository {
  public async create(userId: string, code: string) {
    return RecoveryModel.create({
      userId,
      code,
      status: RecoveryStatus.InProgress,
      expirationDate: add(new Date(), {
        hours: mainConfig.recovery.expirationDate,
      }),
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

export default RecoveryCommandRepository;
