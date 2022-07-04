// import * as joi from 'joi';
import { compare } from 'bcryptjs';
import ResError from '../utils/ResError';
import IUserModel from '../models/interfaces/IUserModel';
import IUserService, { IUPayload } from './interfaces/IUserService';
import JwtConfig from '../utils/jwtConfig';

export default class UserService implements IUserService {
  private model: IUserModel;

  constructor(model: IUserModel) {
    this.model = model;
  }

  // private idJoi = joi.object({
  //   id: joi.string().alphanum().required(),
  // });

  private jwt = new JwtConfig();

  private UNAUTH = 'Incorrect nick or password';

  // async findById(id: string): Promise<IUser> {
  //   try {
  //     await this.idJoi.validateAsync({ id });
  //   } catch (error: any) {
  //     throw new ResError(error.message, 400);
  //   }
  //   const result = await this.model.findById(id);
  //   return result;
  // }

  private async validatePassword(comingPassword: string, password: string): Promise<void> {
    const isValid = await compare(comingPassword, password);
    if (!isValid) throw new ResError(this.UNAUTH, 401);
  }

  async login(comingNickname: string, comingPassword: string): Promise<IUPayload | undefined> {
    if (!comingNickname || !comingPassword) throw new ResError(this.UNAUTH, 401);
    const user = await this.model.findByNick(comingNickname);
    if (!user) throw new ResError(this.UNAUTH, 401);
    const {
      id, nickname, username, password,
    } = user;
    await this.validatePassword(comingPassword, password);
    const token = this.jwt.crypt({ id, nickname, password });
    return { user: { id, nickname, username }, token };
  }
}
