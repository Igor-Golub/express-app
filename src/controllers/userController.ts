import { Request, Response } from "express";
import UserService from "../services/userService";
import { UserQueryRepository } from "../repositories/query";
import DBService from "../services/dbService";
import { UserCommandRepository } from "../repositories/command";
import { StatusCodes } from "../enums/StatusCodes";

class UserController {
  private userQueryRepository: UserQueryRepository = new UserQueryRepository(DBService);

  private userService: UserService = new UserService(this.userQueryRepository, new UserCommandRepository(DBService));

  public async getAll(req: Request, res: Response<Models.UserModel[]>) {
    const data = await this.userService.get();

    res.status(StatusCodes.Ok_200).send(data);
  }

  public async create(req: Request<Record<string, unknown>, Models.UserModel>, res: Response) {
    const entity = req.body;

    const result = await this.userService.create(entity);

    res.status(StatusCodes.Created_201).send(result);
  }
}

export default new UserController();
