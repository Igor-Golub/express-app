import express from "express";
import bodyParser from "body-parser";
import { Routs } from "./enums/Routs";
import { videoRouter } from "./routs/video-router";

export const app = express();

app.use(bodyParser({}));

app.use(Routs.Videos, videoRouter);

app.listen(3000, () => {});
