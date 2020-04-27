import { Connection } from 'mongoose';
import mongoose = require('mongoose');
const mongoose_autopopulate = require('mongoose-autopopulate');
const mongoose_delete = require('mongoose-delete');
const mongoose_paginate = require('mongoose-paginate');
const mongoose_timestamp = require('mongoose-timestamp');
const mongoose_unique_validator = require('mongoose-unique-validator');
export class DB {
  public db: Connection;
  public ObjectId: any;
  public seeder: any;
  public options: any;

  constructor(opt: any) {
    this.options = opt;
    this.ObjectId = mongoose.Types.ObjectId;
    this.createConnection();
  }

  public createConnection() {
    try {
      this.db = mongoose.createConnection(this.options.uri, {
        useCreateIndex: this.options.useCreateIndex || true,
        useNewUrlParser: this.options.useNewUrlParser || true,
        useUnifiedTopology: this.options.useUnifiedTopology || true,
      });

      this.db.on('error', console.error.bind(console, 'connection error:'));
      this.db.once('open', () => {
        console.log('Connected to DB');
      });
    } catch (error) {
      throw error;
    }
  }

  public createModel(model: any) {
    let Schema = new mongoose.Schema(model.schema, model.options || {});

    // apply Plugins
    Schema.plugin(mongoose_timestamp, {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    });
    Schema.plugin(mongoose_autopopulate);
    Schema.plugin(mongoose_paginate);
    Schema.plugin(mongoose_unique_validator,{ message: '{PATH} already exist' });


    Schema.set('toJSON', { getters: true, virtuals: true });

    if(model.index){
      Schema.index(model.index)
    }

    if(model.virtual && model.virtual.length > 0){
      model.virtual.forEach((virtual:any) => {
        Schema.virtual(virtual.name, virtual.opt);
      });
    }
    return this.db.model(model.name, Schema);
  }

}
