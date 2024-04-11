import { Faker } from '@faker-js/faker';
import { setSeederFactory } from 'typeorm-extension';
import { Cv } from '../entities/cv.entity'; // Adjust the path

export const CvFactory = setSeederFactory(Cv, (faker: Faker) => {
  const cv = new Cv();
  cv.name = faker.person.lastName();
  cv.firstname = faker.person.firstName();
  cv.age = faker.number.int({ min: 18, max: 65 });
  cv.Cin = faker.string.numeric(8);
  cv.Job = faker.person.jobTitle();
  cv.path = `../assets/path/to/cv_${faker.number.int()}.pdf`;
  return cv;
});
