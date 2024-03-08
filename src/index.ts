import express from "express";
import dotenv from "dotenv";
import { postRouter } from "./routs/post-router";
import { testingRouter } from "./routs/testing-router";
import { userRouter } from "./routs/user-router";
import { blogRouter } from "./routs/blog-router";
import { authRouter } from "./routs/auth-router";
import { commentsRouter } from "./routs/comments-router";
import { Resources } from "./enums/Resources";
import dbService from "./application/dbService";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app
  .use(Resources.Blogs, blogRouter)
  .use(Resources.Posts, postRouter)
  .use(Resources.Users, userRouter)
  .use(Resources.Auth, authRouter)
  .use(Resources.Comments, commentsRouter)
  .use(Resources.Testing, testingRouter);

dbService.connect();

app.listen(process.env.PORT ?? 5000, () => {
  console.log("Server started!");
});
