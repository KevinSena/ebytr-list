import { Request, Response, NextFunction } from 'express';
import ITasksService from '../services/interfaces/ITasksService';
import ITasksController from './interfaces/ITasksController';

export default class TasksController implements ITasksController {
  private service: ITasksService;

  constructor(service: ITasksService) {
    this.service = service;
  }

  async findTasksToday(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      const result = await this.service.findTasks(authorization as string, 'today');
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async findTasksTomorrow(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      const result = await this.service.findTasks(authorization as string, 'tomorrow');
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      const {
        task, description, feeling, priorityId,
      } = req.body;
      const result = await this.service.create(
        authorization as string,
        task,
        description,
        feeling,
        priorityId,
      );
      res.status(201).json({ insertId: result });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { authorization } = req.headers;
      const {
        task, description, feeling, priorityId,
      } = req.body;
      const result = await this.service.update(
        authorization as string,
        task,
        description,
        feeling,
        priorityId,
      );
      res.status(201).json({ AffectedRows: result });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.body;
      const result = await this.service.delete(id);
      res.status(201).json({ AffectedRows: result });
    } catch (error) {
      next(error);
    }
  }
}
