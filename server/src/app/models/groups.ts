export default class Model {
  public options: any;
  public virtual: any;
  public index: any;
  public schema: any;
  public name: string;

  constructor() {
    this.name = 'groups';
    this.schema = {
      title: { type: String , required:[true, 'Title is required']},
      slug: { type: String , required:[true, 'slug is required']},
      description: { type: String , required:[true, 'description is required']},
    };

    this.virtual = [{
      name:"devices",
      opt:{
        ref: 'devices',
        localField: '_id',
        foreignField: 'group',
        justOne: false,
        // options: { sort: { name: -1 }, limit: 5 } 
      }
    }]
  }
}
