export type IUPayload = {
  user: {
    id: string,
    nickname: string,
    username: string,
  },
  token: string
};

export default interface IUserService {
  // findById(id: string): Promise<IUser>
  login(nickname: string, password: string): Promise<IUPayload | undefined>
  // getToken(id: string, nickname: string, password: string): Promise<string | undefined>
}
