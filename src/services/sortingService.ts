import { SortingDirectionStrings } from "../enums/Sorting";
import { Sort } from "mongodb";

class ClientSortingService<Model extends Pick<DBModels.MongoResponseEntity<ViewModels.BaseModel>, "_id">>
  implements Base.SortingService<Model>
{
  public value: Base.Sorting<Model> = {
    sortBy: "_id",
    sortDirection: SortingDirectionStrings.DESC,
  };

  public setValue(key: keyof Model | undefined, value: SortingDirectionStrings | undefined) {
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
