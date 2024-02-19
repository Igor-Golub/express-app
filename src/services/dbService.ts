import dotenv from "dotenv";
import { MongoClient, ObjectId, WithId } from "mongodb";
import { DataBaseEntities } from "../enums/DataBaseEntities";

dotenv.config();

class DBService {
  private client = new MongoClient(String(process.env.MONGO_URL));

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
    const userCollection = await this.client
      .db(process.env.DB_NAME)
      .collection(DataBaseEntities.Users)
      .find({})
      .toArray();

    if (userCollection.length) return;

    await this.client.db(process.env.DB_NAME).collection(DataBaseEntities.Users).insertOne(this.rootUser);
  }

  public async get<Key extends DataBaseEntities>(dbKey: Key): Promise<Omit<WithId<Models.DBValues[Key]>, "_id">[]> {
    const result = await this.client.db(process.env.DB_NAME).collection<Models.DBValues[Key]>(dbKey).find({}).toArray();

    return result.map(({ _id, ...entity }) => ({
      ...entity,
      createdAt: _id.getTimestamp(),
      id: _id.toString(),
    }));
  }

  public async getId<Key extends DataBaseEntities>(
    dbKey: Key,
    id: string,
  ): Promise<Omit<WithId<Models.DBValues[Key]>, "_id"> | null> {
    const result = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .findOne({ _id: new ObjectId(id) });

    if (!result) return null;

    const { _id, ...entity } = result as WithId<Models.DBValues[Key]>;

    return {
      ...entity,
      createdAt: _id.getTimestamp(),
      id: _id,
    };
  }

  public async create<Entity extends Models.DBValuesUnion>(
    dbKey: DataBaseEntities,
    entity: Entity,
  ): Promise<Entity | null> {
    const result = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .insertOne({ ...entity });

    if (!result.acknowledged) return null;

    return {
      ...entity,
      createdAt: result.insertedId.getTimestamp(),
      id: result.insertedId.toString(),
    };
  }

  public async update<Entity extends Models.DBValuesUnion>(
    dbKey: DataBaseEntities,
    id: string,
    entity: Entity,
  ): Promise<Entity | null> {
    const foundEntity = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .findOne({ _id: new ObjectId(id) });

    if (!foundEntity) return null;

    const result = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .updateOne({ _id: new ObjectId(id) }, { $set: entity });

    if (!result.acknowledged) return null;

    return { ...foundEntity, ...entity };
  }

  public async delete(dbKey: DataBaseEntities, id: string) {
    const foundEntity = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .findOne({ _id: new ObjectId(id) });

    if (!foundEntity) return false;

    const result = await this.client
      .db(process.env.DB_NAME)
      .collection(dbKey)
      .deleteOne({ _id: new ObjectId(id) });

    return result.acknowledged;
  }

  public async clear() {
    await this.client.db(process.env.DB_NAME).collection(DataBaseEntities.Videos).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseEntities.Posts).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseEntities.Blogs).deleteMany({});
  }
}

export default new DBService();
