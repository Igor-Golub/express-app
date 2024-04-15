import { Router } from "express";
import { Routs } from "../enums";
import TestingController from "../controllers/testingController";
import { container } from "../inversify.config";

const testingController = container.resolve(TestingController);

export const testingRouter = Router({});

testingRouter.delete(Routs.AllData, testingController.clear);
