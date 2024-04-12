// skill.seeder.ts
import { DataSource, In } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { Cv } from '../entities/cv.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    try {
      const userFactory = factoryManager.get(User);
      const cvRepository = dataSource.getRepository(Cv);
      const users = await userFactory.saveMany(7);

      await Promise.all(
        users.map(async (user) => {
          const numberOfCvsToAdd = Math.floor(Math.random() * 5) + 1; // Generate a random number between 1 and 5 for the number of cvs to add
          const randomCvsIds = Array.from(
            { length: numberOfCvsToAdd },
            () => Math.floor(Math.random() * 20) + 1,
          ); // Generate random Cvs IDs
          const cvs = await cvRepository.find({
            where: { id: In(randomCvsIds) },
          }); // Find skills based on the random skill IDs
          user.cvs = cvs; // Assign the random skills to the CV
          await dataSource.manager.save(user); // Save the CV
        }),
      );

      console.log('Added Users:', users);
    } catch (error) {
      console.error('Error seeding Users:', error);
    }
  }
}
