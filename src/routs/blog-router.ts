import { Request, Response, Router } from "express";
import { Routs } from "../enums/Routs";
import BlogRepository from "../repositories/blogRepository";
import DBService from "../services/dbService";
import BlogService from "../services/blogService";
import { validation } from "../middlewares/validation";
import { blogValidators } from "../validators/blog";
import { auth } from "../middlewares/auth";

export const blogRouter = Router({});

const blogService = new BlogService(new BlogRepository(DBService));

blogRouter.get(Routs.Root, (_, res: Response<Contracts.BlogModel[]>) => {
  const data = blogService.get();

  res.status(200).send(data);
});

blogRouter.get(
  Routs.RootWithId,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;
    const entity = blogService.getId(id);

    if (!entity) res.status(404).end();
    else res.status(200).send(entity);
  },
);

blogRouter.post(
  Routs.Root,
  auth,
  ...blogValidators.create,
  validation,
  (
    req: Request<
      Record<string, unknown>,
      Contracts.BlogModelCreateAndUpdateDTO
    >,
    res: Response,
  ) => {
    const entity = req.body;

    const result = blogService.create(entity);

    res.status(201).send(result);
  },
);

blogRouter.put(
  Routs.RootWithId,
  auth,
  ...blogValidators.update,
  validation,
  (
    req: Request<{ id: string }, Contracts.BlogModelUpdateDTO>,
    res: Response,
  ) => {
    const id = req.params.id;
    const videoEntity = req.body;

    const result = blogService.update(id, videoEntity);

    if (!result) res.status(404).end();
    else res.status(204).send(blogService.getId(id));
  },
);

blogRouter.delete(
  Routs.RootWithId,
  auth,
  (req: Request<{ id: string }>, res: Response) => {
    const id = req.params.id;

    const result = blogService.delete(id);

    if (!result) res.status(404).end();
    else res.status(204).end();
  },
);
