import { CommentsQueryRepository } from "../repositories/query";
import { Response } from "express";
import { StatusCodes } from "../enums/StatusCodes";
import { CommentsLikesService, CommentsService } from "../services";

class CommentController implements Base.Controller {
  constructor(
    private readonly commentsQueryRepository: typeof CommentsQueryRepository,
    private readonly commentsService: typeof CommentsService,
    private readonly commentsLikesService: typeof CommentsLikesService,
  ) {}

  public getAll = async () => {};

  public getById = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      context: { user },
      params: { id },
    } = req;

    const entity = await this.commentsQueryRepository.getById(String(id), user?.id);

    if (!entity) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.Ok_200).send(entity);
  };

  public create = async () => {};

  public update = async (req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.Comment>, res: Response) => {
    const {
      params: { id },
      body: commentDTO,
      context: { user },
    } = req;

    const commentEntity = await this.commentsQueryRepository.getById(String(id));

    if (commentEntity && commentEntity?.commentatorInfo.userId !== user!.id) {
      res.status(StatusCodes.Forbidden_403).end();
    } else {
      const result = await this.commentsService.update(String(id), commentDTO);

      if (!result) res.status(StatusCodes.NotFound_404).end();
      else res.status(StatusCodes.NoContent_204).send(result);
    }
  };

  public changeLikeStatus = async (req: Utils.RequestWithParamsAndReqBody<Params.URIId, DTO.Like>, res: Response) => {
    const {
      context: { user },
      params: { id: commentId },
      body,
    } = req;

    const result = await this.commentsLikesService.updateLikeStatus(user!.id, String(commentId), body.likeStatus);

    if (result.status) res.status(StatusCodes.NotFound_404).end();
    else res.status(StatusCodes.NoContent_204).end();
  };

  public delete = async (req: Utils.ReqWithParams<Params.URIId>, res: Response) => {
    const {
      params: { id },
      context: { user },
    } = req;

    const commentEntity = await this.commentsQueryRepository.getById(String(id));

    if (commentEntity && commentEntity?.commentatorInfo.userId !== user!.id) {
      res.status(StatusCodes.Forbidden_403).end();
    } else {
      const result = await this.commentsService.delete(String(id));

      if (!result) res.status(StatusCodes.NotFound_404).end();
      else res.status(StatusCodes.NoContent_204).end();
    }
  };
}

export default new CommentController(CommentsQueryRepository, CommentsService, CommentsLikesService);
