import generateInnerResult from "../utils/generateInnerResult";
import { ResultStatuses } from "../enums/Inner";

class BaseDomainService {
  public innerUnauthorizedResult() {
    return generateInnerResult(ResultStatuses.Unauthorized, { data: null });
  }

  public innerSuccessResult<T>(data: T) {
    return generateInnerResult<T>(ResultStatuses.Success, { data });
  }
}

export default BaseDomainService;
