import { Pool } from 'mysql2/promise';
import ITasksModel, { ITask } from './interfaces/ITasksModel';

export default class TasksModel implements ITasksModel {
  private mysql: Pool;

  constructor(mysql: Pool) {
    this.mysql = mysql;
  }

  async findTasks(id: string, day: string): Promise<ITask[]> {
    const [rows] = await this.mysql.execute(
      `SELECT dayTasks.id, dayTasks.day, dayTasks.task, dayTasks.description, dayTasks.feeling, priorities.priority
      FROM dayTasks INNER JOIN priorities
      ON dayTasks.priorityId = priorities.id
      WHERE userId=? AND day=DATE(NOW());`,
      [id],
    );
    const [tomorrow] = await this.mysql.execute(
      `SELECT dayTasks.id, dayTasks.day, dayTasks.task, dayTasks.description, dayTasks.feeling, priorities.priority
      FROM dayTasks INNER JOIN priorities
      ON dayTasks.priorityId = priorities.id
      WHERE userId=? AND day=DATE_ADD(CURDATE(),INTERVAL 1 DAY);`,
      [id],
    );
    const res = JSON.stringify(day === 'tomorrow' ? tomorrow : rows);
    return JSON.parse(res) as ITask[];
  }

  async create(
    userId: number,
    task: string,
    description: string,
    feeling: string,
    priorityId: number,
  ): Promise<string | undefined> {
    const [rows] = await this.mysql.execute(
      `INSERT INTO dayTasks (userId, day, task, description, feeling, priorityId) VALUES
      (?, DATE(NOW()), ?, ?, ?, ?);`,
      [userId, task, description, feeling, priorityId],
    );
    const res = JSON.stringify(rows);
    return JSON.parse(res).insertId;
  }

  async update(
    id: number,
    task: string,
    description: string,
    feeling: string,
    priorityId: number,
  ): Promise<string | undefined> {
    const [rows] = await this.mysql.execute(
      `UPDATE dayTasks
      SET task=?, description=?, feeling=?, priorityId=?
      WHERE dayTasks.id=?;`,
      [task, description, feeling, priorityId, id],
    );
    const res = JSON.stringify(rows);
    return JSON.parse(res).affectedRows;
  }

  async delete(id: number): Promise<string | undefined> {
    const [rows] = await this.mysql.execute('DELETE FROM dayTasks WHERE id=?;', [id]);
    const res = JSON.stringify(rows);
    return JSON.parse(res).affectedRows;
  }
}
