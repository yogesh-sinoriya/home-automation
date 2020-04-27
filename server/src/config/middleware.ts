import { AuthMiddleware } from '../app/middlewares/auth';
import { BaseMiddleware } from '../app/middlewares/base';

export class Middleware {
  public permissions: any[];
  public base: any[];
  public auth: any[];
  constructor() {
    this.config();
  }

  public config() {
    const auth = new AuthMiddleware();
    const base = new BaseMiddleware();
    this.auth = [auth.verify()];
    this.base = [base.checkMethod(), base.boot()];
  }
}
