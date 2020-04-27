import { Request } from "express";
import { Models, JWT } from './../../config/provider';

export default class AuthController {
  model = Models.users;
  constructor(){}
  async register(req:Request){
    if(req.body.password !== req.body.confirm_password){
      throw {message:"Password not matched"}
    }
    req.body.password = await JWT.bcrypt(req.body.password);
    delete req.body.confirm_password;
    
    const user = await this.model.create(req.body);

    const response: any = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }

    response.token = await JWT.encode(response);

    return {
      result: { response }
    }
  }

  async login(req:Request){
    const user:any = this.model.findOne({email:req.body.email});
    if (user === null) {
      throw {
        message: 'Email or password not correct',
        statusCode: 403,
      };
    }
    
    const isValid = await JWT.compare(req.body.password, user.password);
    if (!isValid) {
      throw {
        message: 'Email or password not correct',
        statusCode: 403,
      };
    }

    const response: any = {
      _id: user._id,
      name: user.name,
      email: user.email,
    }

    response.token = await JWT.encode(response);

    return {
      result: { response }
    }
  }
}
