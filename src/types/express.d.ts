export declare global {
  namespace Express {
    export interface Request {
      context: {
        user: Pick<ViewModels.User, "id"> | null;
      };
    }
  }
}
