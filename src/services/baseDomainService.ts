import generateInnerResult from "../utils/generateInnerResult";
import { ResultStatuses } from "../enums/Inner";
import { StatusCodes } from "../enums/StatusCodes";

class BaseDomainService {
  public innerUnauthorizedResult() {
    return generateInnerResult(ResultStatuses.Unauthorized, { data: null, status: StatusCodes.Unauthorized_401 });
  }

  public innerSuccessResult<T>(data: T) {
    return generateInnerResult<T>(ResultStatuses.Success, { data, status: StatusCodes.Ok_200 });
  }

  public innerNotFoundResult() {
    return generateInnerResult(ResultStatuses.NotFound, { data: null, status: StatusCodes.NotFound_404 });
  }
}

export default BaseDomainService;
