import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { User } from '../entities/user.entity';

export const UserFactory = setSeederFactory(User, (faker: Faker) => {
  const user = new User();
  user.username = faker.internet.userName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  const words = ['admin', 'user'];
  const randNum = faker.number.int({ min: 0, max: 1 });
  user.role = words[randNum];
  return user;
});
