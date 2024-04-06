import { AuthSessionsModel } from "../../application/db/models";
import { ObjectId } from "mongodb";

class AuthSessionCommandRepository {
  public async checkIsTokenValid(version: string) {
    return AuthSessionsModel.findOne({
      version,
    });
  }

  public async create(entity: DBModels.Sessions) {
    const { _id } = await AuthSessionsModel.create(entity);

    const newEntity: ServicesModels.Session = {
      id: _id.toString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: ObjectId, entity: DBModels.Sessions) {
    const { matchedCount } = await AuthSessionsModel.updateOne({ id }, entity);

    if (!matchedCount) return null;

    return entity;
  }

  public async delete(userId: string, deviceId: string) {
    return AuthSessionsModel.deleteOne({
      $and: [
        {
          deviceId,
        },
        {
          userId,
        },
      ],
    });
  }

  public async deleteMany(userId: string, sessionsIds: ObjectId[]) {
    const { deletedCount } = await AuthSessionsModel.deleteMany({
      $and: [
        {
          userId,
        },
        {
          _id: {
            $in: sessionsIds,
          },
        },
      ],
    });

    return Boolean(deletedCount);
  }

  public async getAllSessionByUserId(userId: string) {
    return AuthSessionsModel.find({ userId }).lean();
  }

  public async getAllSessionByDeviceId(deviceId: string) {
    return AuthSessionsModel.find({ deviceId }).lean();
  }
}

export default new AuthSessionCommandRepository();
