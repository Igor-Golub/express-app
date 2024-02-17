import dotenv from "dotenv";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { DataBaseEntities } from "../enums/DataBaseEntities";

dotenv.config();

class DBService {
  private client = new MongoClient(process.env.MONGO_URL ?? "");

  private rootUser = {
    name: process.env.ROOT_USER_NAME,
    password: process.env.ROOT_USER_PASSWORD,
  };

  public connect() {
    this.client
      .connect()
      .then(() => console.log("DB connected"))
      .then(() => this.createRootUser.call(this))
      .catch(console.dir);
  }

  private async createRootUser() {
    const userCollection = this.client
      .db(process.env.DB_NAME)
      .collection(DataBaseEntities.Users);

    if (userCollection) return;

    await this.client
      .db(process.env.DB_NAME)
      .createCollection(DataBaseEntities.Users)
      .then((collection) => collection.insertOne(this.rootUser));
  }

  public async get<Key extends DataBaseEntities>(
    dbKey: Key,
  ): Promise<Omit<WithId<Contracts.DBValues[Key]>, "_id">[]> {
    const result = await this.client
      .db()
      .collection<Contracts.DBValues[Key]>(dbKey)
      .find({})
      .toArray();

    return result.map(({ _id, ...entity }) => ({
      id: _id.toString(),
      createdAt: _id.getTimestamp(),
      ...entity,
    }));
  }

  public async getId<Key extends DataBaseEntities>(
    dbKey: Key,
    id: string,
  ): Promise<Omit<WithId<Contracts.DBValues[Key]>, "_id"> | null> {
    const result = await this.client
      .db()
      .collection(dbKey)
      .findOne({ _id: new ObjectId(id) });

    if (!result) return null;

    const { _id, ...entity } = result as WithId<Contracts.DBValues[Key]>;

    return { id: _id, ...entity };
  }

  public async create<Entity extends Contracts.DBValuesUnion>(
    dbKey: DataBaseEntities,
    entity: Entity,
  ): Promise<Entity | null> {
    const result = await this.client
      .db()
      .collection(dbKey)
      .insertOne({ ...entity });

    if (!result.acknowledged) return null;

    return {
      id: result.insertedId.toString(),
      createdAt: result.insertedId.getTimestamp(),
      ...entity,
    };
  }

  public async update<Entity extends Contracts.DBValuesUnion>(
    dbKey: DataBaseEntities,
    id: string,
    entity: Entity,
  ): Promise<Entity | null> {
    const foundEntity = this.client
      .db()
      .collection(dbKey)
      .find({ _id: new ObjectId(id) });

    if (!foundEntity) return null;

    const result = await this.client
      .db()
      .collection(dbKey)
      .updateOne({ _id: new ObjectId(id) }, { $set: entity });

    if (!result.acknowledged) return null;

    return { ...foundEntity, ...entity };
  }

  public async delete(dbKey: DataBaseEntities, id: string) {
    const foundEntity = this.client
      .db()
      .collection(dbKey)
      .find({ _id: new ObjectId(id) });

    if (!foundEntity) return false;

    const result = await this.client
      .db()
      .collection(dbKey)
      .deleteOne({ _id: new ObjectId(id) });

    return result.acknowledged;
  }

  public async clear() {
    await this.client.db().dropCollection(DataBaseEntities.Blogs);
    await this.client.db().dropCollection(DataBaseEntities.Videos);
    await this.client.db().dropCollection(DataBaseEntities.Posts);
  }
}

export default new DBService();
