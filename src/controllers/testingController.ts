import { Request, Response } from "express";
import DBService from "../services/dbService";

class TestingController {
  public async clear(req: Request<{ id: string }>, res: Response) {
    await DBService.clear();

    res.status(204).end();
  }
}

export default TestingController;
