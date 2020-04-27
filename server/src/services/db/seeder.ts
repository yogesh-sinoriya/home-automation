import { join } from 'path';

const requireAll = require('require-all');

export class Seeder {
  public seeds: any;
  private models: any;
  constructor(models: any) {
    this.models = models;
    this.seeds = requireAll({
      dirname: join(__dirname + '/seeders'),
      filter: /(.+)\.json$/,
      map(name: string) {
        return name.split('.')[1];
      },
      resolve(Seed: any) {
        return Seed;
      },
    });
  }
  public async startSeeding() {
    try {
      const keys = await Object.keys(this.seeds);

      for (const key of keys) {
        const obj = await this.models[key].find({});

        if (obj.length === 0) {
          // tslint:disable-next-line: no-console
          console.log(`Seeding ${key}!`);

          await this.models[key].create(this.seeds[key]);
        }
      }
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error);
    }
  }
}
