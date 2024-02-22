class PaginationService {
  public value: Base.Pagination = {
    page: 1,
    pageSize: 10,
    pagesCount: 0,
    totalCount: 0,
  };

  private setValue(key: keyof Base.Pagination, value: number) {
    if (!value) return;
    this.value[key] = value;
  }

  public createPagination(req: Utils.ReqWithQuery<Params.PaginationQueryParams>) {
    this.setValue("page", Number(req.query.pageNumber));
    this.setValue("pageSize", Number(req.query.pageSize));
  }
}

export default new PaginationService();
