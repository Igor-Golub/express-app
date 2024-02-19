import { Request } from "express";

export declare global {
  namespace Utils {
    type ReqWithParams<Params> = Request<Params>;

    type RequestWithParamsAndReqBody<Params, ReqBody> = Request<Params, any, ReqBody>;

    type ReqWithResBody<ResBody> = Request<any, ResBody>;

    type ReqWithReqBody<ReqBody> = Request<any, any, ReqBody>;

    type ReqWithQuery<QueryParams> = Request<any, any, any, QueryParams>;
  }
}
