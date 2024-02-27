import UserService from "../services/userService";
import { StatusCodes } from "../enums/StatusCodes";
import { Response } from "express";

class AuthController {
  constructor(private readonly userService: typeof UserService) {}

  public login = async (req: Utils.ReqWithReqBody<DTO.Login>, res: Response) => {
    const { body } = req;

    const result = await this.userService.findUserByLoginOrEmail(body);

    if (!result) res.status(StatusCodes.Unauthorized_401).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new AuthController(UserService);
