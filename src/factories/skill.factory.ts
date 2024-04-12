import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Skill } from '../entities/skill.entity';

export const SkillFactory = setSeederFactory(Skill, (faker: Faker) => {
  const skill = new Skill();
  skill.designation = faker.lorem.word();
  return skill;
});
