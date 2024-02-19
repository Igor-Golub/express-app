import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { videoRouter } from "./routs/video-router";
import { postRouter } from "./routs/post-router";
import { testingRouter } from "./routs/testing-router";
import { userRouter } from "./routs/user-router";
import { blogRouter } from "./routs/blog-router";
import { Resources } from "./enums/Resources";
import dbService from "./services/dbService";

dotenv.config();

export const app = express();

app.use(bodyParser({}));

app.use(Resources.Videos, videoRouter);
app.use(Resources.Blogs, blogRouter);
app.use(Resources.Posts, postRouter);
app.use(Resources.Users, userRouter);
app.use(Resources.Testing, testingRouter);

dbService.connect();

app.listen(process.env.PORT, () => {
  console.log("Server started!");
});
