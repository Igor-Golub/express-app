import { Request, Response } from "express";

export declare global {
  namespace Base {
    interface Repository<Entity> {
      get(): Promise<Entity[]>;
      getId(id: string): Promise<Entity | null>;
      create(entity: Entity): Promise<Entity | null>;
      update(id: string, entity: Partial<Entity>): Promise<Entity | null>;
      delete(id: string): Promise<boolean>;
    }

    interface Controller {
      getAll(req: Request, res: Response): Promise<void>;
      getById(req: Request, res: Response): Promise<void>;
      create(req: Request, res: Response): Promise<void>;
      update(req: Request, res: Response): Promise<void>;
      delete(req: Request, res: Response): Promise<void>;
    }
  }
}
