import generateInnerResult from "../utils/generateInnerResult";
import { ResultStatuses } from "../enums/Inner";
import { injectable } from "inversify";

@injectable()
class BaseDomainService {
  public innerBadRequestResult<Data>(meta?: Partial<Inner.Meta<Data>>) {
    return generateInnerResult(ResultStatuses.BadRequest, {
      data: null,
      ...meta,
    });
  }

  public innerUnauthorizedResult() {
    return generateInnerResult(ResultStatuses.Unauthorized, {
      data: null,
    });
  }

  public innerForbiddenResult() {
    return generateInnerResult(ResultStatuses.Forbidden, {
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
