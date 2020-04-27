import { Types } from 'mongoose';

export default class Users {
  public options: any;
  public schema: any;
  public name: string;

  constructor() {
    this.name = 'users';
    this.schema = {
      name: { 
        type: String,
        trim: true, 
      },
      email: { 
        type: String, 
        trim: true, 
        index: true, 
        unique: [true, 'email aleady exist'], 
        required:[true, 'email is required'] 
      },
      password: {
        type: String,
        required:[true, 'email is required'],
      },
      auth_token: { type: String },
    };
  }
}
