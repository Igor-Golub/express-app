export declare global {
  namespace Express {
    export interface Request {
      context: {
        user: ViewModels.User;
      };
    }
  }
}
