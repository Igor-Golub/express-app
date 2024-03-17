import { ResultStatuses } from "../enums/Inner";
import { StatusCodes } from "../enums/StatusCodes";

export declare global {
  namespace Inner {
    interface Meta<Data = null> {
      data: Data;
      errorMessage?: string;
      field?: string;
      status?: StatusCodes;
    }

    interface Result<Data = null> {
      status: ResultStatuses;
      meta: Meta<Data>;
    }
  }
}
