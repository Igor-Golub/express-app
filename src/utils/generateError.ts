import { Response } from "express";
import { StatusCodes } from "../enums/StatusCodes";

export default function generateErrorResponse<T>(res: Response, data: Inner.Result<T>) {
  const error: Base.ErrorViewResponse = {
    errorsMessages: [
      {
        field: data?.meta?.field || "",
        message: data?.meta?.errorMessage || "",
      },
    ],
  };

  return res
    .status(data.meta?.status ?? StatusCodes.BadRequest_400)
    .send(data.meta.field ? error : null)
    .end();
}
