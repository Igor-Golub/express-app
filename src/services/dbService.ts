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
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Blogs).deleteMany({});
    await this.client.db(process.env.DB_NAME).collection(DataBaseCollections.Posts).deleteMany({});
  }
}

export default new DBService();
