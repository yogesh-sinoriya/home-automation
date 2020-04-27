const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export class Crypto {
  public algorithm: string;
  public secret: any;
  public expiresIn: any;
  public saltRound: any;
  constructor() {
    this.secret = process.env.SECRET || 'my5ecr3t';
    this.expiresIn = process.env.JWT_LIFE || '3600';
    this.saltRound = process.env.SALT_ROUND || 10;
  }

  public async encode(payload: any = {}) {
    return await jwt.sign(payload, this.secret, {
      expiresIn: parseInt(this.expiresIn),
    });
  }
  public async decode(token: string) {
    try {
      return await jwt.verify(token, this.secret);
    } catch (error) {
      throw error;
    }
  }

  public decodeSync(token: string) {
    try {
      return jwt.verify(token, this.secret);
    } catch (error) {
      throw { statusCode: 440 };
    }
  }

  public async bcrypt(str: string): Promise<string> {
    return await bcrypt.hash(str, this.saltRound);
  }

  public async compare(str: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(str, hash);
  }
}
