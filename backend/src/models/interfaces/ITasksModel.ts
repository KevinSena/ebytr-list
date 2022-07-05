export type ITask = {
  id: string,
  day: Date,
  task: string,
  description: string,
  feeling: string,
  priority: string,
};

export default interface ITasksModel {
  findTasks(id: string, day: string): Promise<ITask[]>
  create(userId: number, task: string,
    description: string, feeling: string, priorityId: number): Promise<string | undefined>
  update(id: number, task: string, description: string, feeling: string,
    priorityId: number): Promise<string | undefined>
  delete(id: number): Promise<string | undefined>
}
