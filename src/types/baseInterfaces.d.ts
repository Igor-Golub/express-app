export declare global {
  namespace Base {
    interface Repository<Entity> {
      get(): Promise<Entity[]>;
      getId(id: string): Promise<Entity | null>;
      create(entity: Entity): Promise<Entity | null>;
      update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
      delete(id: string): Promise<boolean>;
    }
  }
}
