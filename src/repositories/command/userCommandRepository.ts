import { add } from "date-fns";
import mainConfig from "../../configs/mainConfig";
import { UsersModel } from "../../application/db/models";
import { ObjectId } from "mongodb";

class UserCommandRepository {
  public async create(entity: DBModels.User) {
    const { _id } = await UsersModel.create(entity);

    const newEntity: ViewModels.User = {
      id: _id.toString(),
      createdAt: _id.getTimestamp().toISOString(),
      email: entity.email,
      login: entity.login,
    };

    return newEntity;
  }

  public async updateHash(userId: string, hash: string) {
    return UsersModel.findOneAndUpdate({ _id: userId }, { hash });
  }

  public async delete(id: string) {
    const { deletedCount } = await UsersModel.deleteOne({ _id: id });

    return Boolean(deletedCount);
  }

  public async confirmUser(id: ObjectId) {
    return UsersModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "confirmation.isConfirmed": true,
        },
      },
    );
  }

  public async updateConfirmationCode(id: ObjectId, confirmationCode: string) {
    return UsersModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "confirmation.expirationDate": add(new Date(), { minutes: mainConfig.registration.expirationDateTimeout }),
          "confirmation.code": confirmationCode,
        },
      },
    );
  }

  public async findUserByConfirmationCode(confirmationCode: string) {
    return UsersModel.findOne({
      "confirmation.code": confirmationCode,
    });
  }

  public async findUserById(id: string) {
    return UsersModel.findOne({
      _id: new ObjectId(id),
    });
  }

  public async findUserByLoginOrEmail(loginOrEmail: string) {
    return UsersModel.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });
  }

  public async findUserByLogin(login: string) {
    return UsersModel.findOne({
      login,
    });
  }

  public async findUserByEmail(email: string) {
    return UsersModel.findOne({
      email,
    }).lean();
  }
}

export default new UserCommandRepository();
