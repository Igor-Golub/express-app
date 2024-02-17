import { Request, Response, Router } from "express";
import { Routs } from "../enums/Routs";
import DBService from "../services/dbService";
import { validation } from "../middlewares/validation";
import { postValidators } from "../validators/post";
import PostRepository from "../repositories/postRepository";
import PostService from "../services/postService";
import BlogRepository from "../repositories/blogRepository";
import { auth } from "../middlewares/auth";

export const postRouter = Router({});

const postService = new PostService(
  new PostRepository(DBService),
  new BlogRepository(DBService),
);

postRouter.get(Routs.Root, async (_, res: Response<Contracts.PostModel[]>) => {
  const data = await postService.get();

  res.status(200).send(data);
});

postRouter.get(
  Routs.RootWithId,
  async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const entity = await postService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  },
);

postRouter.post(
  Routs.Root,
  auth,
  ...postValidators.create,
  validation,
  async (
    req: Request<
      Record<string, unknown>,
      Contracts.PostModelCreateAndUpdateDTO
    >,
    res: Response,
  ) => {
    const entity = req.body;

    const result = await postService.create(entity);

    res.status(201).send(result);
  },
);

postRouter.put(
  Routs.RootWithId,
  auth,
  ...postValidators.update,
  validation,
  async (
    req: Request<{ id: string }, Contracts.PostModelCreateAndUpdateDTO>,
    res: Response,
  ) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = await postService.update(id, videoEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(postService.getId(id));
  },
);

postRouter.delete(
  Routs.RootWithId,
  auth,
  async (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = await postService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  },
);
