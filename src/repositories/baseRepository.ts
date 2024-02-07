export default abstract class BaseRepository<Entity> {
  abstract get(): Entity[];

  abstract getId(id: string): Entity;

  abstract create(entity: Entity): Entity;

  abstract update(id: string, entity: Entity): Entity | null;

  abstract delete(id: string): boolean;
}