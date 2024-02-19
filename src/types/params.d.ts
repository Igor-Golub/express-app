export declare global {
  namespace Params {
    interface URIId {
      id: string;
    }

    interface PaginationQueryParams {
      pageNumber: string;
      pageSize: string;
      total: string;
    }

    interface SortingQueryParams {
      sortBy: "asc" | "desc";
      searchNameTerm: string;
      sortDirection: string;
    }

    type PaginationAndSortingQueryParams = Partial<PaginationQueryParams & SortingQueryParams>;
  }
}
