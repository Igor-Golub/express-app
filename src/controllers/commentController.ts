import { CommentsQueryRepository } from "../repositories/query";
import { Response } from "express";
import { StatusCodes } from "../enums/StatusCodes";
import CommentsService from "../services/commentsService";

class CommentController implements Base.Controller {
  constructor(
    private readonly commentsQueryRepository: typeof CommentsQueryRepository,
    private readonly commentsService: typeof CommentsService,
  ) {}

  public getAll = async () => {};

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const entity = await this.commentsQueryRepository.getById(String(id));

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async () => {};

  public update = async (req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.Comment>, res: Response) => {
    const id = req.params.id;
    const commentEntity = req.body;

    const result = await this.commentsService.update(String(id), commentEntity);

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).send(result);
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const id = req.params.id;

    const result = await this.commentsService.delete(String(id));

    if (!result) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };
}

export default new CommentController(CommentsQueryRepository, CommentsService);