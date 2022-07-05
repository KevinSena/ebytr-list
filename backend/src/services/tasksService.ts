import JwtConfig from '../utils/jwtConfig';
import ITasksModel, { ITask } from '../models/interfaces/ITasksModel';
import ITasksService from './interfaces/ITasksService';

export default class TasksService implements ITasksService {
  private model: ITasksModel;

  constructor(model: ITasksModel) {
    this.model = model;
  }

  private jwt = new JwtConfig();

  async findTasks(token: string, day: string): Promise<ITask[] | undefined> {
    const payload = this.jwt.decrypt(token);
    const rows = await this.model.findTasks(payload?.id as string, day);
    return rows;
  }

  async create(
    token: string,
    task: string,
    description: string,
    feeling: string,
    priorityId: number,
  )
  : Promise<string | undefined> {
    const payload = this.jwt.decrypt(token);
    const id = await this.model.create(
      parseInt(payload?.id as string, 10),
      task,
      description,
      feeling,
      priorityId,
    );
    return id;
  }

  async update(
    token: string,
    task: string,
    description: string,
    feeling: string,
    priorityId: number,
  ): Promise<string | undefined> {
    const payload = this.jwt.decrypt(token);
    const affected = await this.model.update(
      parseInt(payload?.id as string, 10),
      task,
      description,
      feeling,
      priorityId,
    );
    return affected;
  }

  async delete(id: string): Promise<string | undefined> {
    const affected = await this.model.delete(parseInt(id as string, 10));
    return affected;
  }
}
