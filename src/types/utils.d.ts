import { Request } from "express";

export declare global {
  namespace Utils {
    type ReqWithParams<Params> = Request<Partial<Params>, any, any, Query>;

    type RequestWithParamsAndReqBody<Params, ReqBody> = Request<Partial<Params>, any, ReqBody, Query>;

    type ReqWithResBody<ResBody> = Request<ParamsDictionary, ResBody, any, Query>;

    type ReqWithReqBody<ReqBody> = Request<ParamsDictionary, any, ReqBody, Query>;

    type ReqWithQuery<QueryParams> = Request<ParamsDictionary, any, any, QueryParams>;

    type ReqWithParamsAndQuery<Params, QueryParams> = Request<Partial<Params>, any, any, QueryParams>;

    type AnyFunction = (...args: any[]) => any;
  }
}
