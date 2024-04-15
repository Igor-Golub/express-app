import { NextFunction, Request, Response } from "express";
import { RateLimitedService } from "../application";
import { StatusCodes } from "../enums";
import mainConfig from "../configs/mainConfig";

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl, url, ip } = req;

  const endpoint = originalUrl || url;

  const amountOfCalls = await RateLimitedService.getAllAttemptsEndpointForTime(
    endpoint,
    ip ?? "Not found",
    mainConfig.rateLimit.time,
  );

  if (amountOfCalls > mainConfig.rateLimit.callsAmount) res.status(StatusCodes.ToManyRequests_429).end();
  else next();
};
