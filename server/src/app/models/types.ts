export default class Model {
  public options: any;
  public index: any;
  public schema: any;
  public name: string;

  constructor() {
    this.name = 'types';
    this.schema = {
      title: { type: String , required:[true, 'Title is required']},
      slug: { type: String , required:[true, 'slug is required']},
      description: { type: String , required:[true, 'description is required']},
    };
  }
}
