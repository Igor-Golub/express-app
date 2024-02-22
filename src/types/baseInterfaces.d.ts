export declare global {
  namespace Base {
    interface Pagination {
      page: number;
      pagesCount: number;
      pageSize: number;
      totalCount: number;
    }

    interface QueryRepository<Entity> {
      get(): Promise<Entity[]>;
      getId(id: string): Promise<Entity | null>;
      getWithPagination(): Promise<ViewModels.ResponseWithPagination<Entity>>;
    }

    interface CommandRepository<DBEntity, ViewEntity> {
      create(entity: DBEntity): Promise<ViewEntity | null>;
      update(id: string, entity: Partial<DBEntity>): Promise<ViewEntity | null>;
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
