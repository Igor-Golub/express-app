import { ResultStatuses } from "../enums";

export declare global {
  namespace Inner {
    interface Meta<Data = null> {
      data: Data;
      errorMessage?: string;
      field?: string;
    }

    interface Result<Data = null> {
      status: ResultStatuses;
      meta: Meta<Data>;
    }
  }
}
