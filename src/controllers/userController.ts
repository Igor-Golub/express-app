import { Request, Response } from "express";
import UserService from "../services/userService";
import { UserQueryRepository } from "../repositories/query";
import DBService from "../services/dbService";
import { UserCommandRepository } from "../repositories/command";
import { StatusCodes } from "../enums/StatusCodes";

class UserController {
  constructor(
    private userQueryRepository: typeof UserQueryRepository,
    private userService: typeof UserService,
  ) {}

  public getAll = async (req: Request, res: Response<ViewModels.User[]>) => {
    const data = await this.userQueryRepository.get();

    res.status(StatusCodes.Ok_200).send(data);
  };

  public create = async (req: Utils.ReqWithReqBody<ViewModels.User>, res: Response) => {
    const entity = req.body;

    const result = await this.userService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  };
}

export default new UserController(UserQueryRepository, UserService);
