import { Request, Response } from "express";
import { CookiesKeys } from "../enums/CookiesKeys";
import { CookieOptions } from "express-serve-static-core";

class CookiesService {
  public wright(res: Response, key: CookiesKeys, payload: string, options?: Partial<CookieOptions>) {
    return res.cookie(key, payload, { ...options });
  }

  public read(req: Request, key: CookiesKeys) {
    return req.cookies[key] ?? null;
  }
}

export default new CookiesService();