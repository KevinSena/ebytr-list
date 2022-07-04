export type IUser = {
  id: string,
  nickname: string,
  username: string,
  password: string,
};

export default interface IUserModel {
  findByNick(nickname: string): Promise<IUser>
}
