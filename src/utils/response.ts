import { Response } from "express";
import { StatusCodes } from "../enums/StatusCodes";
import { ResultStatuses } from "../enums/Inner";

const resultStatusCodes: Record<ResultStatuses, StatusCodes> = {
  [ResultStatuses.Success]: StatusCodes.Ok_200,
  [ResultStatuses.NotFound]: StatusCodes.NotFound_404,
  [ResultStatuses.Forbidden]: StatusCodes.Forbidden_403,
  [ResultStatuses.Unauthorized]: StatusCodes.Unauthorized_401,
} as const;

const successResponse = <Data>(res: Response, data: Data) => res.status(StatusCodes.Ok_200).send(data);

const noContentResponse = (res: Response) => res.status(StatusCodes.NoContent_204).end();

const unauthorizedResponse = (res: Response) => res.status(StatusCodes.Unauthorized_401).end();

function generateErrorResponse<T>(res: Response, data: Inner.Result<T>) {
  const error: Base.ErrorViewResponse = {
    errorsMessages: [
      {
        field: data?.meta?.field || "",
        message: data?.meta?.errorMessage || "",
      },
    ],
  };

  return res
    .status(resultStatusCodes[data.status] ?? StatusCodes.BadRequest_400)
    .send(data.meta.field ? error : null)
    .end();
}

export { successResponse, noContentResponse, unauthorizedResponse, generateErrorResponse };
