import { Filter } from "mongodb";
import { FiltersType } from "../enums/Filters";

const mangoMapper: Record<FiltersType, (...args: any) => Partial<Filter<any>>> = {
  [FiltersType.ById]: (field, value) => ({
    [field]: value,
  }),
  [FiltersType.InnerText]: (field, value) => ({
    [field]: {
      $regex: value ?? "",
      $options: "i",
    },
  }),
  [FiltersType.OrAndInnerText]: (data: { field: string; value: string }[]) => ({
    $or: data.map(({ field, value }) => ({
      [field]: {
        $regex: value ?? "",
        $options: "i",
      },
    })),
  }),
};

class ClientFilterService<ViewEntity> implements Base.FilterService<ViewEntity> {
  public value: Filter<any> = {};

  public setValue(filed: string, value: string, type: FiltersType) {
    this.value = mangoMapper[type](filed, value);
  }

  public setValues(data: { filed: string; value: string }[], type: FiltersType) {
    this.value = mangoMapper[type](data);
  }

  public getFilters(): Filter<any> {
    return this.value;
  }
}

export default new ClientFilterService();
