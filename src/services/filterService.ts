import { Filter } from "mongodb";
import { FiltersType } from "../enums/Filters";

const mangoMapper: Record<FiltersType, (field: string, value: string) => Partial<Filter<any>>> = {
  [FiltersType.ById]: (field, value) => ({
    [field]: value,
  }),
  [FiltersType.InnerText]: (field, value) => ({
    [field]: {
      $regex: value ?? "",
      $options: "i",
    },
  }),
};

class ClientFilterService<ViewEntity> implements Base.FilterService<ViewEntity> {
  public value: Filter<any> = {};

  public setValue(filed: string, value: string, type: FiltersType) {
    this.value = mangoMapper[type](filed, value);
  }

  public getFilters(): Filter<any> {
    return this.value;
  }
}

export default new ClientFilterService();
