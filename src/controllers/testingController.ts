import { Request, Response } from "express";
import DBService from "../services/dbService";
import { StatusCodes } from "../enums/StatusCodes";

class TestingController {
  public async clear(req: Request<{ id: string }>, res: Response) {
    await DBService.clear();

    res.status(StatusCodes.NoContent_204).end();
  }
}

export default new TestingController();
