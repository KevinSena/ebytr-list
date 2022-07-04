import {
  Secret, SignOptions, verify, sign,
} from 'jsonwebtoken';
import ResError from './ResError';

interface Ipayload {
  id: string,
  nickname: string,
  password: string
}

export default class JwtConfig {
  private secret: Secret;

  private configs: SignOptions;

  constructor() {
    this.secret = process.env.SECRET || '';
    this.configs = { algorithm: 'HS256', expiresIn: '12h' };
  }

  crypt(payload: Ipayload): string {
    return sign(payload, this.secret, this.configs);
  }

  decrypt(token: string): Ipayload | undefined {
    const data = verify(token, this.secret, (err, decoded) => {
      if (err) throw new ResError(err.message, 400);
      return decoded;
    }) as Ipayload | undefined;
    return data;
  }
}
