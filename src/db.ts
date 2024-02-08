import { DataBaseEntities } from "./enums/DataBaseEntities";

export const db: Contracts.IDB = {
  [DataBaseEntities.Videos]: {},
  [DataBaseEntities.Blogs]: {},
  [DataBaseEntities.Posts]: {},
};
