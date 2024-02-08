import { DataBaseEntities } from "./enums/DataBaseEntities";

export const db: Contracts.IDB = {
  [DataBaseEntities.Videos]: {},
  [DataBaseEntities.Blogs]: {},
  [DataBaseEntities.Posts]: {},
  [DataBaseEntities.Users]: {
    root: {
      id: "root",
      name: "admin",
      password: "YWRtaW46cXdlcnR5",
    },
  },
};
