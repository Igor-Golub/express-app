import express from "express";
import bodyParser from "body-parser";
import { videoRouter } from "./routs/video-router";
import { testingRouter } from "./routs/testing-router";
import { Resources } from "./enums/Resources";

export const app = express();

app.use(bodyParser({}));

app.use(Resources.Videos, videoRouter);
app.use(Resources.Testing, testingRouter);

app.listen(3000, () => {});
