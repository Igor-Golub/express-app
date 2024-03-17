import UserService from "../services/userService";
import UserQueryRepository from "../repositories/query/userQueryRepository";
import { StatusCodes } from "../enums/StatusCodes";
import { Request, Response } from "express";
import mainConfig from "../configs/mainConfig";

class AuthController {
  constructor(
    private readonly userService: typeof UserService,
    private readonly userQueryRepository: typeof UserQueryRepository,
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
    else res.status(StatusCodes.Ok_200).send({ accessToken: result });
  };

  public confirmation = async (req: Utils.ReqWithReqBody<DTO.Confirmation>, res: Response) => {
    const {
      body: { code },
    } = req;

    const result = await this.userService.confirmUser(code);

    if (!result) res.status(StatusCodes.BadRequest_400).end();
    else res.status(StatusCodes.NoContent_204).end();
  };

  public registration = async (req: Utils.ReqWithReqBody<DTO.Registration>, res: Response) => {
    const { body } = req;

    const result = await this.userService.registerUser(body);

    if (!result) res.status(StatusCodes.BadRequest_400).end();
    else res.status(StatusCodes.NoContent_204).send(mainConfig.registration.successMessage);
  };

  public resending = async (req: Utils.ReqWithReqBody<DTO.Resending>, res: Response) => {
    const {
      body: { email },
    } = req;

    const result = await this.userService.resendConfirmationCode(email);

    if (!result) res.status(StatusCodes.BadRequest_400).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new AuthController(UserService, UserQueryRepository);
