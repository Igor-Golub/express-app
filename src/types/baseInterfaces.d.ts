import { Filter, Sort, SortDirection } from "mongodb";
import { SortingDirectionStrings } from "../enums/Sorting";

export declare global {
  namespace Base {
    interface Sorting<Model> {
      sortBy: keyof Model;
      sortDirection: SortDirection;
    }

    interface Pagination {
      pageNumber: number;
      pagesCount: number;
      pageSize: number;
      totalCount: number;
    }

    interface QueryRepository<Entity> {
      get(): Promise<Entity[]>;
      getId(id: string): Promise<Entity | null>;
      getWithPagination(sort: Sort, filters: Filter<any> = {}): Promise<ViewModels.ResponseWithPagination<Entity>>;
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

    interface SortingService<ViewEntity> {
      setValue(key: keyof ViewEntity | undefined, value: SortingDirectionStrings | undefined);
      createSortCondition(): Sort;
    }

    interface FilterService<ViewEntity> {
      setValue(filed: string, value: string, type: FiltersType);
      getFilters(): Filter<any>;
    }
  }
}
