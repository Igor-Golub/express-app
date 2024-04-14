import express from "express";
import cookieParser from "cookie-parser";
import "reflect-metadata";
import { postRouter, testingRouter, userRouter, blogRouter, authRouter, sessionRouter, commentsRouter } from "./routs";
import { Resources } from "./enums/Resources";
import { DbService } from "./application";
import mainConfig from "./configs/mainConfig";
import { apiCallsLogger } from "./middlewares";

const app = express();

app.set("trust proxy", true);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(apiCallsLogger);

app
  .use(Resources.Blogs, blogRouter)
  .use(Resources.Posts, postRouter)
  .use(Resources.Users, userRouter)
  .use(Resources.Auth, authRouter)
  .use(Resources.Sessions, sessionRouter)
  .use(Resources.Comments, commentsRouter)
  .use(Resources.Testing, testingRouter);

DbService.connect();

app.listen(mainConfig.port, () => {
  console.log("Server started!");
});
