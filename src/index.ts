import express from "express";
import bodyParser from "body-parser";
import { videoRouter } from "./routs/video-router";
import { postRouter } from "./routs/post-router";
import { testingRouter } from "./routs/testing-router";
import { blogRouter } from "./routs/blog-router";
import { Resources } from "./enums/Resources";

export const app = express();

app.use(bodyParser({}));

app.use(Resources.Videos, videoRouter);
app.use(Resources.Blogs, blogRouter);
app.use(Resources.Posts, postRouter);
app.use(Resources.Testing, testingRouter);

app.listen(3001, () => {});
