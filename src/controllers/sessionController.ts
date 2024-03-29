import { Request, Response } from "express";

class SessionController {
  public getAllUserSessions = (req: Request, res: Response) => {};

  public removeAllUserSessions = (req: Request, res: Response) => {};

  public removeUserSessionById = (req: Request, res: Response) => {};
}

export default new SessionController();
