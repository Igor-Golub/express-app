import { add } from "date-fns";
import { injectable } from "inversify";
import mainConfig from "../../../configs/mainConfig";
import { RecoveryStatus } from "../../../enums";
import { RecoveryModel } from "../domain/recovery";

@injectable()
class RecoveryCommandRepo {
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

export default RecoveryCommandRepo;
