import { CorsOptions } from "cors";
import cors = require('cors');
export class BaseMiddleware {
  corsOptions: CorsOptions;
  
  whitelist = ['http://localhost:4200']
  constructor() {
    this.corsOptions = {
      origin: (origin: any, callback: any) => {
        console.log('Got request from --> ', origin);
        if (this.whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
          callback(new Error('Invalid Request!!'))
        }
      }
    }
  }
  public boot() {
    return (req: any, res: any, next: Function) => {
      // console.log("Hi i m base middleware");
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS'
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, Content-Length, X-Requested-With'
      );

      // intercepts OPTIONS method
      if ('OPTIONS' === req.method) {
        // respond with 200
        res.sendStatus(200);
      } else {
        // move on
        next();
      }
    };
  }

  public checkMethod() {
    return (req: any, res: any, next: Function) => {
      if (
        ['OPTIONS', 'GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) === -1
      ) {
        next({ statusCode: 405 });
      } else {
        // move on
        // console.log(req.session);

        next();
      }
    };
  }

  public setupCors() {
    return cors(this.corsOptions);
  }
}
