const requireAll = require('require-all');
import { join } from 'path';
import { DB } from './db';
import { Crypto } from './crypto';
import { logger } from './logger';
import { Seeder, DeviceManager } from '../services';
import { Model } from "mongoose";

import async = require('async');
import { BaseController } from './abstract';
import { SocketManager } from './socket';

const db: DB = new DB({
  uri: process.env.DB_URI || 'mongodb://localhost:27017/iot',
  useNewUrlParser: true,
});
const ObjectId = db.ObjectId;

const Models: { [key: string]: Model<any>; } = requireAll({
  dirname: join(__dirname + '/../app/models'),
  filter: getModels(),
  resolve(Model: any) {
    const model = new Model.default();
    return db.createModel(model);
  },
});

const Controllers: { [key: string]: BaseController; } = requireAll({
  dirname: join(__dirname + '/../app/controllers'),
  filter: getConts(),
  resolve(Controller: any) {
    return new Controller.default();
  },
});

const JWT: Crypto = new Crypto();
const seeder: Seeder = new Seeder(Models);
setTimeout(() => seeder.startSeeding());

const socket:SocketManager = new SocketManager();
const deviceManager = new DeviceManager(socket);

export {
  ObjectId,
  Controllers,
  JWT,
  Models,
  async,
  logger,
  deviceManager,
  socket
};


function getModels(){
  if(process.env.NODE_ENV == 'production'){
    return /(.+)\.js$/;
  }else {
    return /(.+)\.ts$/;
  }
}

function getConts(){
  if(process.env.NODE_ENV == 'production'){
    return /(.+Controller)\.js$/;
  }else {
    return /(.+Controller)\.ts$/;
  }
}

