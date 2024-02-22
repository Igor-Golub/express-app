import DbService from "../../services/dbService";
import { DataBaseEntities } from "../../enums/DataBaseEntities";
import { ObjectId } from "mongodb";

class VideoCommandRepository implements Base.CommandRepository<DBModels.Video, ViewModels.Video> {
  constructor(private dbService: typeof DbService) {}

  public async create(entity: DBModels.Video) {
    const { insertedId, acknowledged } = await this.dbService.videosCollection.insertOne({ ...entity });

    if (!acknowledged) return null;

    const newEntity: ViewModels.Video = {
      id: insertedId.toString(),
      createdAt: insertedId.getTimestamp().toISOString(),
      ...entity,
    };

    return newEntity;
  }

  public async update(id: string, entity: DBModels.Video) {
    const { acknowledged, upsertedId } = await this.dbService.videosCollection.updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: { ...entity },
      },
    );

    if (!acknowledged || !upsertedId) return null;

    return {
      id: upsertedId.toString(),
      createdAt: upsertedId?.getTimestamp().toISOString(),
      ...entity,
    };
  }

  public async delete(id: string) {
    const { deletedCount } = await this.dbService.videosCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return Boolean(deletedCount);
  }
}

export default new VideoCommandRepository(DbService);
