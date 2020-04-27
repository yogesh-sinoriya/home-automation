const bodyParser = require('body-parser');
const express = require('express');
const status = require('express-status-monitor');
const fileUpload = require('express-fileupload');
const httpStatus = require('http-status');
const morgan = require('morgan');

import { createServer, Server } from 'http';
import { Middleware } from '../config/middleware';
import { Routes } from '../config/routes';
import { join } from 'path';

export class WebServer {
  public static readonly PORT: number = 5000;
  private app: any;
  private server: Server;
  private port: string | number;

  constructor() {
    this.createApp();
    this.config();
    this.configPlugins();
    this.configMonitor();
    this.configMiddlewares();
    this.createRoutes();
    this.createServer();
    this.createErrorHandler();
    this.listen();
  }

  public getApp(): any {
    return this.app;
  }

  private createApp(): void {
    this.app = express();
  }

  private configPlugins(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true,
    }));
  }

  private configMiddlewares(): void {
    const middleware = new Middleware();
    this.app.use(...middleware.base);
    // this.app.use('/api/*', ...middleware.auth);
    // this.app.use(favicon(join(__dirname, '/../../../client/dist/client', 'favicon.ico')))
  }

  private configMonitor(): void {
    this.app.use('/api/*', morgan('tiny'));
    this.app.use(status());
  }

  private createRoutes(): void {
    const routes = new Routes().getRouter();
    this.app.use(routes);
  }

  private createServer(): void {
    this.server = createServer(this.app);
  }

  private config(): void {
    this.port = process.env.PORT || WebServer.PORT;
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log(`Vimo ERP server is live at http://localhost:${this.port}`);
    });
  }

  private createErrorHandler(): void {
    this.app.use((err: any, req: any, res: any, next: Function) => {
      res
        .status(err.statusCode || 500)
        .type('application/json')
        .json({
          err_code: err.err_code || err.statusCode || 500,
          message: err.message || httpStatus[err.statusCode],
        });
    });
  }
}


