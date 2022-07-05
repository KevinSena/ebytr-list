import { Pool } from 'mysql2/promise';
import IUserModel, { IUser } from './interfaces/IUserModel';

export default class UserModel implements IUserModel {
  private mysql: Pool;

  constructor(mysql: Pool) {
    this.mysql = mysql;
  }

  // async create(nickname: string, username: string, password: string): Promise<string | null> {
  //   const [rows] = await this.mysql.execute(
  //     `INSERT INTO list.users ('nickname', 'username', 'password')
  //     VALUES (?, ?, ?);`,
  //     [nickname, username, password],
  //   );
  //   const res = JSON.stringify(rows);
  //   return JSON.parse(res).insertId;
  // }

  async findByNick(nickname: string): Promise<IUser> {
    const [rows] = await this.mysql.execute(
      'SELECT * FROM users WHERE nickname = ?',
      [nickname],
    );
    const res = JSON.stringify(rows);
    return JSON.parse(res)[0] as IUser;
  }
}
