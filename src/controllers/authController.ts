import UserService from "../services/userService";
import UserQueryRepository from "../repositories/query/userQueryRepository";
import { CookiesService } from "../application";
import { Request, Response } from "express";
import { CookiesKeys } from "../enums/CookiesKeys";
import { generateErrorResponse, noContentResponse, successResponse, unauthorizedResponse } from "../utils/response";

class AuthController {
  constructor(
    private readonly userQueryRepository: typeof UserQueryRepository,
    private readonly userService: typeof UserService,
    private readonly cookiesService: typeof CookiesService,
  ) {}

  public me = async (req: Request, res: Response) => {
    const result = await this.userQueryRepository.getMe(req.context.user.id);

    if (!result) unauthorizedResponse(res);
    else successResponse(res, result);
  };

  public login = async (req: Utils.ReqWithReqBody<DTO.Login>, res: Response) => {
    const { body, headers } = req;

    const result = await this.userService.login(body, {
      deviceIp: req.ip ?? "Not found",
      deviceName: headers["user-agent"] ?? "Not found",
    });

    if (!result?.meta.data) unauthorizedResponse(res);
    else {
      const {
        session: { deviceId },
        pairTokens: { refresh },
      } = result.meta.data;

      successResponse(
        this.cookiesService.writeManuSecure(res, [
          { key: CookiesKeys.RefreshToken, payload: refresh },
          { key: CookiesKeys.DeviceId, payload: deviceId },
        ]),
        { accessToken: result.meta.data.pairTokens.access },
      );
    }
  };

  public confirmation = async (req: Utils.ReqWithReqBody<DTO.Confirmation>, res: Response) => {
    const {
      body: { code },
    } = req;

    const result = await this.userService.confirmUser(code);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public registration = async (req: Utils.ReqWithReqBody<DTO.Registration>, res: Response) => {
    const { body } = req;

    const result = await this.userService.registerUser(body);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public resending = async (req: Utils.ReqWithReqBody<DTO.Resending>, res: Response) => {
    const {
      body: { email },
    } = req;

    const result = await this.userService.resendConfirmationCode(email);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public refreshTokenPair = async (req: Request, res: Response) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const result = await this.userService.refreshTokenPairs(refreshToken);

    if (!result.meta.data) generateErrorResponse(res, result);
    else
      successResponse(this.cookiesService.writeSecure(res, CookiesKeys.RefreshToken, result.meta.data.refresh), {
        accessToken: result.meta.data.access,
      });
  };

  public recoveryPassword = async (req: Utils.ReqWithReqBody<DTO.PasswordRecovery>, res: Response) => {
    const { body } = req;
  };

  public createNewPassword = async (req: Utils.ReqWithReqBody<DTO.NewPassword>, res: Response) => {
    const { body } = req;
  };

  public logout = async (req: Request, res: Response) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const result = await this.userService.logout(refreshToken);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };
}

export default new AuthController(UserQueryRepository, UserService, CookiesService);
