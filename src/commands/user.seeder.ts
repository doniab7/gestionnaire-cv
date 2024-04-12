// skill.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/user.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    try {
      const userFactory = factoryManager.get(User);
      const users = await userFactory.saveMany(3);

      console.log('Added Users:', users);
    } catch (error) {
      console.error('Error seeding Users:', error);
    }
  }
}
