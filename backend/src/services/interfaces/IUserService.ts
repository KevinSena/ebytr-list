export type IUPayload = {
  user: {
    id: string,
    nickname: string,
    username: string,
  },
  token: string
};

export default interface IUserService {
  login(nickname: string, password: string): Promise<IUPayload | undefined>
}
