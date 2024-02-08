import { Response, Router } from "express";
import DBService from "../services/dbService";
import { Routs } from "../enums/Routs";

export const testingRouter = Router({});

testingRouter.delete(Routs.AllData, (_, res: Response) => {
  DBService.clear();

  res.status(204).end();
});
