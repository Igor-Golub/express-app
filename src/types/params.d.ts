import { SortingDirectionStrings } from "../enums/Sorting";

export declare global {
  namespace Params {
    interface URIId {
      id: string;
    }

    interface PaginationQueryParams {
      pageNumber: string;
      pageSize: string;
    }

    interface SortingQueryParams {
      sortBy: string;
      sortDirection: SortingDirectionStrings;
    }

    interface FilterQueryParams {
      searchNameTerm: string;
    }

    type PaginationAndSortingQueryParams = Partial<PaginationQueryParams & SortingQueryParams> & FilterQueryParams;
  }
}
