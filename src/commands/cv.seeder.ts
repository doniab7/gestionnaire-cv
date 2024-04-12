import { DataSource, In } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Cv } from '../entities/cv.entity';
import { Skill } from '../entities/skill.entity';

export default class CvSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    try {
      const cvFactory = factoryManager.get(Cv);
      const skillRepository = dataSource.getRepository(Skill);
      const cvs = await cvFactory.saveMany(10);

      await Promise.all(
        cvs.map(async (cv) => {
          const numberOfSkillsToAdd = Math.floor(Math.random() * 5) + 1; // Generate a random number between 1 and 5 for the number of skills to add
          const randomSkillIds = Array.from(
            { length: numberOfSkillsToAdd },
            () => Math.floor(Math.random() * 20) + 1,
          ); // Generate random skill IDs
          const skills = await skillRepository.find({
            where: { id: In(randomSkillIds) },
          }); // Find skills based on the random skill IDs
          cv.skills = skills; // Assign the random skills to the CV
          await dataSource.manager.save(cv); // Save the CV
        }),
      );

      console.log('Added CVs:', cvs);
    } catch (error) {
      console.error('Error seeding CVs:', error);
    }
  }
}
