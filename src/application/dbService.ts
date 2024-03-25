import dotenv from "dotenv";
import { Collection, Filter, MongoClient, Sort } from "mongodb";
import { DataBaseCollections } from "../enums/DataBaseCollections";
import { Document } from "bson";

dotenv.config();

class DBService {
  private client = new MongoClient(String(process.env.MONGO_URL));

  public connect() {
    this.client
      .connect()
      .then(() => console.log("DB connected"))
      .catch(console.dir);
  }

  public blogsCollection = this.client.db(process.env.DB_NAME).collection<DBModels.Blog>(DataBaseCollections.Blogs);

  public postsCollection = this.client.db(process.env.DB_NAME).collection<DBModels.Post>(DataBaseCollections.Posts);

  public usersCollection = this.client.db(process.env.DB_NAME).collection<DBModels.User>(DataBaseCollections.Users);

  public blackListCollection = this.client
    .db(process.env.DB_NAME)
    .collection<DBModels.BlackList>(DataBaseCollections.BlackList);

  public commentsCollection = this.client
    .db(process.env.DB_NAME)
    .collection<DBModels.Comment>(DataBaseCollections.Comments);

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
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Blogs).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Posts).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Users).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Comments).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.BlackList).deleteMany({});
  }
}

export default new DBService();
