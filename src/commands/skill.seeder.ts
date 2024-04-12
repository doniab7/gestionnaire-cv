// skill.seeder.ts
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Skill } from '../entities/skill.entity';

export default class SkillSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    try {
      const skillFactory = factoryManager.get(Skill);
      const skills = await skillFactory.saveMany(15);

      console.log('Added Skills:', skills);
    } catch (error) {
      console.error('Error seeding Skills:', error);
    }
  }
}
