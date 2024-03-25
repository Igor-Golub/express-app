import UserService from "../services/userService";
import UserQueryRepository from "../repositories/query/userQueryRepository";
import CookiesService from "../application/cookiesService";
import { StatusCodes } from "../enums/StatusCodes";
import { Request, Response } from "express";
import generateErrorResponse from "../utils/generateError";
import { CookiesKeys } from "../enums/CookiesKeys";

class AuthController {
  constructor(
    private readonly userService: typeof UserService,
    private readonly userQueryRepository: typeof UserQueryRepository,
    private readonly cookiesService: typeof CookiesService,
  ) {}

  public me = async (req: Request, res: Response) => {
    const result = await this.userQueryRepository.getById(req.context.user.id);

    if (!result) res.status(StatusCodes.Unauthorized_401).end();
    else res.status(StatusCodes.Ok_200).send(result);
  };

  public login = async (req: Utils.ReqWithReqBody<DTO.Login>, res: Response) => {
    const { body } = req;

    const result = await this.userService.login(body);

    if (!result) res.status(StatusCodes.Unauthorized_401).end();
    else
      this.cookiesService
        .wright(res, CookiesKeys.Refresh, result.refresh, { httpOnly: true, secure: true })
        .status(StatusCodes.Ok_200)
        .send({ accessToken: result.access });
  };

  public confirmation = async (req: Utils.ReqWithReqBody<DTO.Confirmation>, res: Response) => {
    const {
      body: { code },
    } = req;

    const result = await this.userService.confirmUser(code);

    if (result.status) generateErrorResponse(res, result);
    else res.status(StatusCodes.NoContent_204).end();
  };

  public registration = async (req: Utils.ReqWithReqBody<DTO.Registration>, res: Response) => {
    const { body } = req;

    const result = await this.userService.registerUser(body);

    if (result.status) generateErrorResponse(res, result);
    else res.status(StatusCodes.NoContent_204).end();
  };

  public resending = async (req: Utils.ReqWithReqBody<DTO.Resending>, res: Response) => {
    const {
      body: { email },
    } = req;

    const result = await this.userService.resendConfirmationCode(email);

    if (result.status) generateErrorResponse(res, result);
    else res.status(StatusCodes.NoContent_204).end();
  };

  public refreshToken = async (req: Request, res: Response) => {
    const refreshToken = this.cookiesService.read(req, CookiesKeys.Refresh);

    const result = await this.userService.refreshTokenPairs(refreshToken);

    if (!result.meta.data) generateErrorResponse(res, result);
    else
      this.cookiesService
        .wright(res, CookiesKeys.Refresh, result.meta.data.refresh, { httpOnly: true, secure: true })
        .status(StatusCodes.Ok_200)
        .send({ accessToken: result.meta.data.access });
  };
}

export default new AuthController(UserService, UserQueryRepository, CookiesService);
