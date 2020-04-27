import { JWT } from '../../config/provider';

export class AuthMiddleware {
  private ignoreList: string[];
  private ignoreApi: string;

  constructor() {
    this.ignoreApi = '/api/v1';
    this.ignoreList = [
      '/auth/_login',
      '/auth/_register',
    ].map((v: string) => this.ignoreApi + v);
  }

  public verify() {
    
    return (req: any, res: any, next: Function) => {
    if (this.ignoreList.indexOf(req.baseUrl) !== -1 ) {
        next();
      } else if (!req.headers.authorization) {
        throw { statusCode: 440, message: 'token expired' };
      } else {
        const token = req.headers.authorization.replace('Bearer ', '');
        const data = JWT.decodeSync(token);
        req.auth = data;
        next();
      }
    };
  }

}
