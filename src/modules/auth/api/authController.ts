import { Request, Response } from "express";
import { inject, injectable } from "inversify";
import { CookiesKeys } from "../../../enums";
import { CookiesService } from "../../../application";
import UserService from "../../user/app/userService";
import UserQueryRepository from "../../user/infrastructure/userQueryRepository";
import {
  generateErrorResponse,
  noContentResponse,
  successResponse,
  unauthorizedResponse,
} from "../../../utils/response";

@injectable()
class AuthController {
  constructor(
    @inject(UserQueryRepository) private readonly userQueryRepository: UserQueryRepository,
    @inject(UserService) private readonly userService: UserService,
    @inject(CookiesService) private readonly cookiesService: CookiesService,
  ) {}

  public me = async (req: Request, res: Response<ViewModels.UserMe>) => {
    const {
      context: { user },
    } = req;

    const result = await this.userQueryRepository.getMe(user!.id);

    if (!result) unauthorizedResponse(res);
    else successResponse(res, result);
  };

  public login = async (req: Utils.ReqWithReqBody<DTO.Login>, res: Response<{ accessToken: string }>) => {
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

  public refreshTokenPair = async (req: Request, res: Response<{ accessToken: string }>) => {
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

    await this.userService.recoveryPassword(body);

    return noContentResponse(res);
  };

  public createNewPassword = async (req: Utils.ReqWithReqBody<DTO.NewPassword>, res: Response) => {
    const { body } = req;

    const result = await this.userService.createNewPassword(body);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };

  public logout = async (req: Request, res: Response) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.RefreshToken);

    const result = await this.userService.logout(refreshToken);

    if (result.status) generateErrorResponse(res, result);
    else noContentResponse(res);
  };
}

export default AuthController;
