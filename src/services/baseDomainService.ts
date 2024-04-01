import generateInnerResult from "../utils/generateInnerResult";
import { ResultStatuses } from "../enums/Inner";

class BaseDomainService {
  public innerBadRequestResult() {
    return generateInnerResult(ResultStatuses.BadRequest, {
      data: null,
    });
  }

  public innerUnauthorizedResult() {
    return generateInnerResult(ResultStatuses.Unauthorized, {
      data: null,
    });
  }

  public innerSuccessResult<T>(data: T) {
    return generateInnerResult<T>(ResultStatuses.Success, {
      data,
    });
  }

  public innerNotFoundResult() {
    return generateInnerResult(ResultStatuses.NotFound, {
      data: null,
    });
  }
}

export default BaseDomainService;
