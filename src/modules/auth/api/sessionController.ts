import { Request, Response } from "express";
import { CookiesKeys } from "../../../enums";
import { inject, injectable } from "inversify";
import { CookiesService } from "../../../application";
import { generateErrorResponse, noContentResponse, successResponse } from "../../../utils/response";
import SessionQueryRepo from "../infrastructure/sessionQueryRepo";
import SessionsService from "../app/sessionsService";

@injectable()
class SessionController {
  constructor(
    @inject(SessionQueryRepo) private readonly sessionQueryRepo: SessionQueryRepo,
    @inject(SessionsService) private readonly sessionsService: SessionsService,
    @inject(CookiesService) private readonly cookiesService: CookiesService,
  ) {}

  public getAllUserSessions = async (req: Request, res: Response<ViewModels.Session[]>) => {
    const {
      context: { user },
    } = req;

    const result = await this.sessionQueryRepo.getAll(user!.id);

    return successResponse(res, result);
  };

  public removeAllUserSessions = async (req: Request, res: Response) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const {
      context: { user },
    } = req;

    const result = await this.sessionsService.removeAll(user!.id, refreshToken);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public removeUserSessionById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      context: { user },
      params: { id },
    } = req;

    const result = await this.sessionsService.removeById(user!.id, String(id));

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };
}

export default SessionController;
