class PaginationService {
  public value: Base.Pagination = {
    pageNumber: 1,
    pageSize: 10,
    pagesCount: 0,
    totalCount: 0,
  };

  public setValue(key: keyof Base.Pagination, value: number) {
    this.value[key] = value;
  }

  public setValues(values: Partial<Params.PaginationQueryParams>) {
    Object.entries(values).forEach(([key, value]) => {
      if (!value) return;

      this.value[key as keyof Base.Pagination] = Number(value);
    });
  }
}

export default new PaginationService();
