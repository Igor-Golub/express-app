import { SortingDirectionStrings } from "../enums";

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
      searchLoginTerm: string;
      searchEmailTerm: string;
    }

    type PaginationAndSortingQueryParams = Partial<PaginationQueryParams & SortingQueryParams & FilterQueryParams>;
  }
}
