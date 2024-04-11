import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Cv } from '../entities/cv.entity';

export default class CvSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    try {
      const cvFactory = factoryManager.get(Cv);
      const cvs = await cvFactory.saveMany(7);
      console.log('Added CVs:', cvs);
    } catch (error) {
      console.error('Error seeding CVs:', error);
    }
  }
}
