import DbService from "../../application/dbService";
import { ObjectId } from "mongodb";
import { add } from "date-fns";

class UserCommandRepository {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.User) {
    const { insertedId, acknowledged } = await this.dbService.usersCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.User = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      email: entity.email,
      login: entity.login,
    };

    return newEntity;
  }

  public async update() {
    return null;
  }

  public async delete(id: string) {
    const { deletedCount } = await this.dbService.usersCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }

  public async confirmUser(id: ObjectId) {
    return this.dbService.usersCollection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "confirmation.isConfirmed": true,
          "confirmation.expirationDate": "",
          "confirmation.code": "",
        },
      },
    );
  }

  public async updateConfirmationCode(id: ObjectId, confirmationCode: string) {
    return this.dbService.usersCollection.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "confirmation.expirationDate": add(new Date(), { minutes: 3 }),
          "confirmation.code": confirmationCode,
        },
      },
    );
  }

  public async findUserByConfirmationCode(confirmationCode: string) {
    return this.dbService.usersCollection.findOne({
      "confirmation.code": confirmationCode,
    });
  }

  public async findUserByLoginOrEmail(loginOrEmail: string) {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;

    return user;
  }

  public async findUserByLoginOrEmailWithHash(loginOrEmail: string) {
    const user = await this.dbService.usersCollection.findOne({
      $or: [{ email: loginOrEmail }, { login: loginOrEmail }],
    });

    if (!user) return null;

    return user;
  }
}

export default new UserCommandRepository(DbService);
