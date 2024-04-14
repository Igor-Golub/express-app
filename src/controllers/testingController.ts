import { Response, Request } from "express";
import { injectable } from "inversify";
import DBService from "../application/db/dbService";
import { StatusCodes } from "../enums/StatusCodes";

@injectable()
class TestingController {
  public clear = async (req: Request, res: Response) => {
    await DBService.clear();

    res.status(StatusCodes.NoContent_204).end();
  };
}

export default TestingController;
