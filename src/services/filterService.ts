import { Filter } from "mongodb";

class ClientFilterService<ViewEntity> implements Base.FilterService<ViewEntity> {
  public value: string = "";

  public setValue(value: string) {
    this.value = value;
  }

  public getFilters(): Filter<any> {
    return {
      name: {
        $regex: this.value,
      },
    };
  }
}

export default new ClientFilterService();
