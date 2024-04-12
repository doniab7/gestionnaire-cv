import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Skill } from '../entities/skill.entity';

export const SkillFactory = setSeederFactory(Skill, (faker: Faker) => {
  const skill = new Skill();
  const words = [
    'Communication',
    'Leadership',
    'Teamwork',
    'Problem-solving',
    'Time management',
    'Adaptability',
    'Creativity',
    'Critical thinking',
    'Decision making',
    'Organization',
    'Analytical skills',
    'Attention to detail',
    'Collaboration',
    'Conflict resolution',
    'Customer service',
    'Flexibility',
    'Initiative',
    'Negotiation',
    'Presentation skills',
    'Stress management',
  ];
  const randNum = faker.number.int({ min: 0, max: 19 });
  skill.designation = words[randNum];
  return skill;
});
