import { NextFunction, Request, Response } from "express";
import { RateLimitedService } from "../application";

export const apiCallsLogger = async (req: Request, res: Response, next: NextFunction) => {
  const { originalUrl, url, ip } = req;

  const endpoint = originalUrl || url;

  await RateLimitedService.logApiCallFromIp({
    endpoint,
    ip: ip ?? "Not found",
    lastCall: new Date().toISOString(),
  });

  return next();
};
