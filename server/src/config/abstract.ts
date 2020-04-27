import { Models } from './provider';
import { Model } from 'mongoose';
import { Request } from 'express';

export class BaseController {
  public model: Model<any>;
  constructor(name: string) {
    this.model = Models[name];
  }

  public async find(req: Request): Promise<any> {
    return {
      result: await this.model.find(req.body).sort({ created_at: -1 }),
    };
  }

  public async findOne(req: Request): Promise<any> {
    return {
      result: await this.model.findById(req.params._id),
    };
  }

  public async create(req: Request): Promise<any> {
    return {
      result: await this.model.create(req.body),
    };
  }

  public async update(req: Request): Promise<any> {
    delete req.body.created_at;
    delete req.body.updated_at;
    return {
      result: await this.model.findByIdAndUpdate(req.params._id, req.body),
    };
  }

  public async delete(req: Request): Promise<any> {
    return {
      result: await this.model.findByIdAndDelete(req.params._id),
    };
  }
}
