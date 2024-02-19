import { Request, Response } from "express";
import UserService from "../services/userService";

class UserController {
  constructor(private userService: UserService) {}

  public async getAll(req: Request, res: Response<Models.UserModel[]>) {
    const data = await this.userService.get();

    res.status(200).send(data);
  }

  public async create(
    req: Request<Record<string, unknown>, Models.UserModel>,
    res: Response,
  ) {
    const entity = req.body;

    const result = await this.userService.create(entity);

    res.status(201).send(result);
  }
}

export default UserController;
