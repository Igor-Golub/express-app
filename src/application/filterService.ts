import { FilterQuery } from "mongoose";
import { injectable } from "inversify";
import { FiltersType } from "../enums";

@injectable()
class ClientFilterService<ViewEntity> implements Base.FilterService<ViewEntity> {
  private mangoMapper: Record<FiltersType, (...args: any) => Partial<FilterQuery<any>>> = {
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

  private value: FilterQuery<ViewEntity> = {};

  public setValue(filed: string, value: string, type: FiltersType) {
    this.value = this.mangoMapper[type](filed, value);
  }

  public setValues(data: Record<string, string | undefined>, type: FiltersType) {
    this.value = this.mangoMapper[type](data);
  }

  public getFilters(): FilterQuery<ViewEntity> {
    return this.value;
  }
}

export default ClientFilterService;
