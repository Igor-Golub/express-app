import { DataBaseEntities } from "../enums/DataBaseEntities";
import { db } from "../db";

class DBService {
  private db: Contracts.IDB = db;

  public get<Key extends DataBaseEntities>(
    dbKey: Key,
  ): Contracts.DBValues[Key][] {
    return Object.entries(this.db[dbKey]).reduce<Contracts.DBValues[Key][]>(
      (acc, [_, value]) => {
        acc.push(value);
        return acc;
      },
      [],
    );
  }

  public getId<Key extends DataBaseEntities>(
    dbKey: Key,
    id: string,
  ): Contracts.DBValues[Key] {
    return this.db[dbKey][id];
  }

  public getByName<Key extends DataBaseEntities>(
    dbKey: Key,
    name: string,
  ): Contracts.DBValues[Key] | null {
    const currentEntity = Object.values(this.db[dbKey]).find((entity) => {
      if ("name" in entity) return entity.name === name;
      return null;
    });

    return currentEntity || null;
  }

  public create<Entity extends Contracts.DBValuesUnion>(
    dbKey: DataBaseEntities,
    entity: Entity,
  ): Entity {
    const id = String(Date.now());

    const newEntity: Entity = { ...entity, id };

    this.db[dbKey][id] = newEntity;

    return newEntity;
  }

  public update<Entity extends Contracts.DBValuesUnion>(
    dbKey: DataBaseEntities,
    id: string,
    entity: Entity,
  ): Entity | null {
    if (!this.db[dbKey][id]) return null;

    const newEntity: Entity = { ...this.db[dbKey][id], ...entity };

    this.db[dbKey][id] = newEntity;

    return newEntity;
  }

  public delete(dbKey: DataBaseEntities, id: string) {
    if (!this.db[dbKey][id]) return false;

    delete this.db[dbKey][id];

    return true;
  }

  public clear() {
    this.db = {
      [DataBaseEntities.Blogs]: {},
      [DataBaseEntities.Videos]: {},
      [DataBaseEntities.Posts]: {},
      [DataBaseEntities.Users]: db.users,
    };
  }
}

export default new DBService();
