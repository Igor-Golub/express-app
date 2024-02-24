import dotenv from "dotenv";
import { Collection, Filter, MongoClient, Sort } from "mongodb";
import { DataBaseEntities } from "../enums/DataBaseEntities";
import { Document } from "bson";

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

  public blogsCollection = this.client.db(process.env.DB_NAME).collection<DBModels.Blog>(DataBaseEntities.Blogs);

  public postsCollection = this.client.db(process.env.DB_NAME).collection<DBModels.Post>(DataBaseEntities.Posts);

  public usersCollection = this.client.db(process.env.DB_NAME).collection<DBModels.User>(DataBaseEntities.Users);

  public async findWithPagination<TSchema extends Document = Document>(
    collection: Collection<TSchema>,
    { pageNumber, pageSize }: Omit<Base.Pagination, "totalCount" | "pagesCount">,
  ) {
    return collection
      .find({})
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
  }

  public async findWithPaginationAndSorting<TSchema extends Document = Document>(
    collection: Collection<TSchema>,
    { pageNumber, pageSize }: Omit<Base.Pagination, "totalCount" | "pagesCount">,
    sortingCondition: Sort,
    filter: Filter<TSchema> = {},
  ) {
    return collection
      .find(filter)
      .sort(sortingCondition)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .toArray();
  }

  public async clear() {
    await this.client.db(process.env.DB_NAME).dropDatabase();
  }
}

export default new DBService();
