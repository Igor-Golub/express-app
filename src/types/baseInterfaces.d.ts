export declare global {
  namespace Base {
    interface QueryRepository<Entity> {
      get(): Promise<Entity[]>;
      getId(id: string): Promise<Entity | null>;
    }

    interface CommandRepository<Entity> {
      create(entity: Entity): Promise<Entity | null>;
      update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
      delete(id: string): Promise<boolean>;
    }

    interface Controller {
      getAll(req, res): Promise<void>;
      getById(req, res): Promise<void>;
      create(req, res): Promise<void>;
      update(req, res): Promise<void>;
      delete(req, res): Promise<void>;
    }
  }
}
