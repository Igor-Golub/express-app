import { Router } from "express";
import { Routs } from "../enums/Routs";
import TestingController from "../controllers/testingController";

export const testingRouter = Router({});

const testingController = new TestingController();

testingRouter.delete(Routs.AllData, testingController.clear);
