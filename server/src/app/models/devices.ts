import { Types } from "mongoose";

export default class Model {
  public options: any;
  public index: any;
  public schema: any;
  public name: string;

  constructor() {
    this.name = 'devices';
    this.schema = {
      name: { type: String, required:[true, 'Name is required'] },
      key: { type: String, required:[true, 'Key is required'], unique: [true, 'key aleady exist'], },
      type: { type: Types.ObjectId, ref: 'types', required: [true, 'Device type is required']  },
      group: { type: Types.ObjectId, ref: 'groups', required: [true, 'Device group is required']  },
      status: { type: Boolean },
      description: { type: String },
    };
    this.index = {
      key:1
    }
  }
}
