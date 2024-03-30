import { NextFunction, Request, Response } from "express";
import { RateLimitedService } from "../application";
import { StatusCodes } from "../enums/StatusCodes";
import mainConfig from "../configs/mainConfig";

export const rateLimit = async (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl, url, socket } = req;

  const endpoint = originalUrl || url;

  const amountOfCalls = await RateLimitedService.getAllAttemptsEndpointForTime(
    endpoint,
    socket.remoteAddress ?? "Not found",
    mainConfig.rateLimit.time,
  );

  if (amountOfCalls > mainConfig.rateLimit.callsAmount) res.status(StatusCodes.ToManyRequests_429).end();
  else next();
};
