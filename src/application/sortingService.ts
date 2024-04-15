import { injectable } from "inversify";
import { Sort } from "mongodb";
import { SortingDirectionStrings } from "../enums";

@injectable()
class ClientSortingService implements Base.SortingService {
  public value: Base.Sorting = {
    sortBy: "_id",
    sortDirection: SortingDirectionStrings.DESC,
  };

  public setValue(key: string | undefined, value: SortingDirectionStrings | undefined) {
    this.value.sortBy = key ?? "_id";
    this.value.sortDirection = value ?? SortingDirectionStrings.DESC;
  }

  public createSortCondition(): Sort {
    return {
      [this.value.sortBy]: this.value.sortDirection,
    };
  }
}

export default ClientSortingService;
