import UserService from "../services/userService";
import UserQueryRepository from "../repositories/query/userQueryRepository";
import { StatusCodes } from "../enums/StatusCodes";
import { Response, Request } from "express";

class AuthController {
  constructor(
    private readonly userService: typeof UserService,
    private readonly userQueryRepository: typeof UserQueryRepository,
  ) {}

  public me = async (req: Request, res: Response) => {
    console.log(req.context.user.id);
    const result = await this.userQueryRepository.getById(req.context.user.id);

    console.log(result);

    if (!result) res.status(StatusCodes.Unauthorized_401).end();
    else res.status(StatusCodes.Ok_200).send(result);
  };

  public login = async (req: Utils.ReqWithReqBody<DTO.Login>, res: Response) => {
    const { body } = req;

    const result = await this.userService.login(body);

    if (!result) res.status(StatusCodes.Unauthorized_401).end();
    else res.status(StatusCodes.Ok_200).send({ accessToken: result });
  };
}

export default new AuthController(UserService, UserQueryRepository);
