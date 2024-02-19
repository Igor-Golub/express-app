declare global {
  namespace Sorting {
    interface CommonQueryParams {
      sortBy: "asc" | "desc";
      searchNameTerm: string;
      sortDirection: string;
    }
  }
}
