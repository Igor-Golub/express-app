import { Response } from "express";
import { StatusCodes } from "../enums/StatusCodes";

export default function generateErrorResponse<T>(res: Response, data: Inner.Result<T>) {
  return res
    .status(data.meta?.status ?? StatusCodes.BadRequest_400)
    .send(
      data.meta.field
        ? {
            errorsMessages: [
              {
                field: data.meta.field,
                message: data.meta.errorMessage,
              },
            ],
          }
        : null,
    )
    .end();
}
