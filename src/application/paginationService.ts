class PaginationService {
  private defaultValues = {
    pageNumber: 1,
    pageSize: 10,
    pagesCount: 0,
    totalCount: 0,
  };

  public value: Base.Pagination = { ...this.defaultValues };

  public setValue(key: keyof Base.Pagination, value: number) {
    this.value[key] = value;
  }

  public setValues(values: Partial<Params.PaginationQueryParams>) {
    Object.entries(values).forEach(([key, value]) => {
      const field = key as keyof Base.Pagination;

      if (!value) this.value[field] = this.defaultValues[field];
      else this.value[field] = Number(value);
    });
  }

  public getPagination() {
    return this.value;
  }
}

export default new PaginationService();
