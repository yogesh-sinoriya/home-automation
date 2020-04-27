import { BaseController } from './../../config/abstract';
import { Request } from 'express';
export default class Controller extends BaseController {
  constructor() {
    super('groups');
  }

  async withDevices(req:Request){
    return {
      result:await this.model.find().populate([{path:'devices',populate:[{path:'type'}]}]).exec()
    }
  }
}
