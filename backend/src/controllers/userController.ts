import { Request, Response, NextFunction } from 'express';
import IUserService from '../services/interfaces/IUserService';
import IUserController from './interfaces/IUserController';

export default class UserController implements IUserController {
  private service: IUserService;

  constructor(service: IUserService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { nickname, password } = req.body;
      const result = await this.service.login(nickname, password);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}
