import { Request, Response } from "express";
import { SessionsService } from "../services";
import { SessionQueryRepository } from "../repositories/query";
import { JWTService, CookiesService } from "../application";
import { generateErrorResponse, noContentResponse, successResponse } from "../utils/response";
import { CookiesKeys } from "../enums/CookiesKeys";

class SessionController {
  constructor(
    private readonly sessionQueryRepository: typeof SessionQueryRepository,
    private readonly sessionsService: typeof SessionsService,
    private readonly cookiesService: typeof CookiesService,
    private readonly jwtService: typeof JWTService,
  ) {}

  public getAllUserSessions = async (req: Request, res: Response<ViewModels.Session[]>) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const jwtDecode = this.jwtService.decode(refreshToken);

    const result = await this.sessionQueryRepository.getAll(jwtDecode!.userId);

    return successResponse(res, result);
  };

  public removeAllUserSessions = async (req: Request, res: Response) => {
    const [currentSessionId, refreshToken] = this.cookiesService.readManu(req, [
      CookiesKeys.SessionId,
      CookiesKeys.RefreshToken,
    ]);

    const jwtDecode = this.jwtService.decode(refreshToken);

    const result = await this.sessionsService.removeAll(jwtDecode!.userId, currentSessionId);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public removeUserSessionById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      params: { id },
    } = req;

    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const jwtDecode = this.jwtService.decode(refreshToken);

    const result = await this.sessionsService.removeById(jwtDecode!.userId, String(id));

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };
}

export default new SessionController(SessionQueryRepository, SessionsService, CookiesService, JWTService);
