import { Request, Response } from "express";
import { SessionsService } from "../services";
import { SessionQueryRepository } from "../repositories/query";
import { generateErrorResponse, noContentResponse, successResponse } from "../utils/response";

class SessionController {
  constructor(
    private readonly sessionQueryRepository: typeof SessionQueryRepository,
    private readonly sessionsService: typeof SessionsService,
  ) {}

  public getAllUserSessions = async (req: Request, res: Response<ViewModels.Session[]>) => {
    const {
      context: { user },
    } = req;

    const result = await this.sessionQueryRepository.getAll(user.id);

    return successResponse(res, result);
  };

  public removeAllUserSessions = async (req: Request, res: Response) => {
    const {
      context: { user },
    } = req;

    const result = await this.sessionsService.removeAll(user.id);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public removeUserSessionById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      context: { user },
      params: { id },
    } = req;

    const result = await this.sessionsService.removeById(user.id, String(id));

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };
}

export default new SessionController(SessionQueryRepository, SessionsService);
