declare global {
  namespace Pagination {
    interface CommonQueryParams {
      pageNumber: string;
      pageSize: string;
      total: string;
    }

    interface Common {
      pageNumber: number;
      pageSize: number;
      total: number;
    }
  }
}
