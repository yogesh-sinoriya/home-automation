const express = require('express');
const httpStatus = require('http-status');
import { Middleware } from './middleware';
import { Controllers } from './provider';
import { join } from 'path';
import { Response } from 'express';

export class Routes {
  private router: any;
  private controllers: any;
  constructor() {
    this.router = express.Router();
    this.controllers = Controllers;
    this.setRoutes();
    this.setClientUI();
  }

  public getRouter(): any {
    return this.router;
  }

  private setRoutes() {
    const middleware = new Middleware();

    this.router.all(
      '/api/v1/:controller/',
      this.route()
    );
    this.router.all(
      '/api/v1/:controller/:_id',
      this.route()
    );
    this.router.all(
      '/api/v1/:controller/:method/:_id',
      this.route()
    );
  }

  private route() {
    return async (req: any, res: Response, next: Function) => {
      //console.log("Hello Guru", req.body);
      const reqId = Math.floor(Math.random() * 10000000000);

      try {
        req.params.controller += 'Controller';
        if (req.params.method && req.params.method.startsWith('_')) {
          req.params.method = req.params.method.slice(1);
        }

        if (!this.controllers[req.params.controller]) {
          throw { statusCode: 404, err_code: 'NF' };
        } else if (
          req.params.method &&
          !this.controllers[req.params.controller][req.params.method]
        ) {
          throw { statusCode: 404, err_code: 'NF' };
        } else {
          if (
            req.params._id &&
            req.params._id.startsWith('_') &&
            req.params.method === undefined
          ) {
            req.params.method = req.params._id.slice(1);
            if (req.method === 'GET') {
              req.params._id = req.params._id || req.query.id;
              req.body = req.query;
              delete req.body.id;
            }
            if (!this.controllers[req.params.controller][req.params.method]) {
              throw { statusCode: 404, err_code: 'NF' };
            }
          }

          if (
            req.method === 'GET' &&
            req.params._id === undefined &&
            req.params.method === undefined
          ) {
            req.params.method = 'find';
          } else if (
            req.method === 'GET' &&
            req.params._id !== undefined &&
            req.params.method === undefined
          ) {
            req.params.method = 'findOne';
          } else if (
            req.method === 'POST' &&
            req.params._id === undefined &&
            req.params.method === undefined
          ) {
            req.params.method = 'create';
          } else if (
            req.method === 'PUT' &&
            req.params._id !== undefined &&
            req.params.method === undefined
          ) {
            req.params.method = 'update';
          } else if (
            req.method === 'DELETE' &&
            req.params._id !== undefined &&
            req.params.method === undefined
          ) {
            req.params.method = 'delete';
          }

          console.log("----------------------->REQ:" + reqId + ":START<-----------------------");
          console.log("PATH: " + req.path);
          console.log("QUERY: " + JSON.stringify(req.query, null, 4));
          console.log("BODY: " + JSON.stringify(req.body, null, 4));


          const result = await this.controllers[req.params.controller][
            req.params.method
          ](req) || {};

          console.log("RES: ", result);
          console.log("----------------------->REQ:" + reqId + ":END<-----------------------");
          if(result.type && result.type === 'file'){
            console.log('Sendind File');
            return res.sendFile(result.path, {headers:{'Content-disposition': 'filename='+result.name}});
          }else if(result.type && result.type === 'redirect'){
            console.log('Redirect To -->',result.url);
            return res.redirect(result.url);
          }else{
            return res
            .status(result.statusCode || httpStatus.OK)
            .type('application/json')
            .json({
              health: result.health,
              status: result.status || 200,
              message: result.message || "success",
              result: result.result || result.data || {},
            });
          }
        }
      } catch (err) {
        console.error(err);
        console.log("----------------------->REQ:" + reqId + ":END WITH ERROR<-----------------------");
        return res
          .status(err.statusCode || httpStatus.INTERNAL_SERVER_ERROR)
          .type('application/json')
          .json({status: err.statusCode || httpStatus.INTERNAL_SERVER_ERROR, message:err.message});
      }
    };
  }

  private setClientUI() {
    this.router.use(
      express.static(join(__dirname + '/../../../client/dist'))
    );
    this.router.get('*', (req: any, res: any) => {
      res.sendFile(join(__dirname + '/../../../client/dist/index.html'));
    });
  }
}
