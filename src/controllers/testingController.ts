import { Response, Request } from "express";
import DBService from "../services/dbService";
import { StatusCodes } from "../enums/StatusCodes";

class TestingController {
  public clear = async (req: Request, res: Response) => {
    await DBService.clear();

    res.status(StatusCodes.NoContent_204).end();
  };
}

export default new TestingController();
