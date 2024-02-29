import { Filter } from "mongodb";
import { FiltersType } from "../enums/Filters";

class ClientFilterService<ViewEntity> implements Base.FilterService<ViewEntity> {
  private mangoMapper: Record<FiltersType, (...args: any) => Partial<Filter<any>>> = {
    [FiltersType.ById]: (field, value) => ({
      [field]: value,
    }),
    [FiltersType.InnerText]: (field, value) => ({
      [field]: {
        $regex: value ?? "",
        $options: "i",
      },
    }),
    [FiltersType.OrAndInnerText]: (data: Record<string, string | undefined>) => {
      const filter = Object.entries(data)
        .filter(([, value]) => Boolean(value))
        .map(([field, value]) => ({
          [field]: { $regex: value ?? "", $options: "i" },
        }));

      return filter.length ? { $or: filter } : {};
    },
  };

  public value: Filter<any> = {};

  public setValue(filed: string, value: string, type: FiltersType) {
    this.value = this.mangoMapper[type](filed, value);
  }

  public setValues(data: Record<string, string | undefined>, type: FiltersType) {
    this.value = this.mangoMapper[type](data);
  }

  public getFilters(): Filter<any> {
    return this.value;
  }
}

export default new ClientFilterService();
