import { Filter, Sort, SortDirection } from "mongodb";
import { SortingDirectionStrings } from "../enums/Sorting";
import { FiltersType } from "../enums/Filters";

export declare global {
  namespace Base {
    interface Sorting {
      sortBy: string;
      sortDirection: SortDirection;
    }

    interface Pagination {
      pageNumber: number;
      pagesCount: number;
      pageSize: number;
      totalCount: number;
    }

    interface PaginationView extends Omit<Pagination, "pageNumber"> {
      page: number;
    }

    interface ResponseWithPagination<Entity> extends PaginationView {
      items: Entity[];
    }

    interface QueryRepository<Entity> {
      getById(id: string): Promise<Entity | null>;
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

    interface SortingService {
      setValue(key: string | undefined, value: SortingDirectionStrings | undefined);
      createSortCondition(): Sort;
    }

    interface FilterService<ViewEntity> {
      setValue(filed: string, value: string | undefined, type: FiltersType);
      setValues(data: Record<string, string | undefined>, type: FiltersType);
      getFilters(): Filter<any>;
    }

    interface NotifyOptions {
      from: string;
      address: string;
      subject: string;
      template: string;
    }

    interface Notify {
      send(options: NotifyOptions): Promise<{ messageId: string }>;
    }

    interface ErrorViewResponse {
      errorsMessages: {
        field: string;
        message: string;
      }[];
    }
  }
}
