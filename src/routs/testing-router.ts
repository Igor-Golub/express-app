import { Response, Router } from "express";
import DBService from "../services/dbService";
import { Routs } from "../enums/Routs";

export const testingRouter = Router({});

const dbService = new DBService();

testingRouter.delete(Routs.AllData, (_, res: Response) => {
  dbService.clear();

  res.status(204).end();
});
