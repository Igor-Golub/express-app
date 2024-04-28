import { Response, Request } from "express";
import { injectable } from "inversify";
import { StatusCodes } from "../../../enums";
import DBService from "../../../application/db/dbService";

@injectable()
class TestingController {
  public clear = async (req: Request, res: Response) => {
    await DBService.clear();

    res.status(StatusCodes.NoContent_204).end();
  };
}

export default TestingController;
