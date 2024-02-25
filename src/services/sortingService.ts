import { SortingDirectionStrings } from "../enums/Sorting";
import { Sort } from "mongodb";

class ClientSortingService implements Base.SortingService {
  public value: Base.Sorting = {
    sortBy: "_id",
    sortDirection: SortingDirectionStrings.DESC,
  };

  public setValue(key: string | undefined, value: SortingDirectionStrings | undefined) {
    if (!key) return;

    this.value.sortBy = key;
    this.value.sortDirection = value ?? SortingDirectionStrings.DESC;
  }

  public createSortCondition(): Sort {
    return {
      [this.value.sortBy]: this.value.sortDirection,
    };
  }
}

export default new ClientSortingService();
