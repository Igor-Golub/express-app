import { Router } from "express";
import { Routs } from "../enums/Routs";
import TestingController from "../controllers/testingController";

export const testingRouter = Router({});

testingRouter.delete(Routs.AllData, TestingController.clear);
