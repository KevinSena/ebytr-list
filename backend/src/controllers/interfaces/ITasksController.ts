import { NextFunction, Request, Response } from 'express';

export default interface ITasksController {
  findTasksToday(req: Request, res: Response, next: NextFunction): Promise<void>
  findTasksTomorrow(req: Request, res: Response, next: NextFunction): Promise<void>
  create(req: Request, res: Response, next: NextFunction): Promise<void>
  update(req: Request, res: Response, next: NextFunction): Promise<void>
  delete(req: Request, res: Response, next: NextFunction): Promise<void>
}
