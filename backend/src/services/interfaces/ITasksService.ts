import { ITask } from '../../models/interfaces/ITasksModel';

export default interface ITasksService {
  findTasks(token: string, day: string): Promise<ITask[] | undefined>
  create(token: string, task: string, description: string, feeling: string,
    priorityId: number): Promise<string | undefined>
  update(token: string, task: string, description: string, feeling: string,
    priorityId: number): Promise<string | undefined>
  delete(id: string): Promise<string | undefined>
}
