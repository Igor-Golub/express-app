import { Request, Response } from "express";
import { injectable } from "inversify";
import { CookieOptions } from "express-serve-static-core";
import { CookiesKeys } from "../enums";

@injectable()
class CookiesService {
  public write(res: Response, key: CookiesKeys, payload: string, options?: Partial<CookieOptions>) {
    return res.cookie(key, payload, { ...options });
  }

  public writeSecure(res: Response, key: CookiesKeys, payload: string, options?: Partial<CookieOptions>) {
    return res.cookie(key, payload, { httpOnly: true, secure: true, ...options });
  }

  public writeManuSecure(
    res: Response,
    data: {
      key: CookiesKeys;
      payload: string | number;
      options?: Partial<CookieOptions>;
    }[],
  ) {
    data.forEach(({ key, payload, options }) => {
      res.cookie(key, String(payload), {
        httpOnly: true,
        secure: true,
        ...options,
      });
    });

    return res;
  }

  public read(req: Request, key: CookiesKeys) {
    return req.cookies[key] ?? null;
  }

  public readManu(req: Request, keys: CookiesKeys[]) {
    return keys.map((key) => req.cookies[key]) ?? [];
  }
}

export default CookiesService;
