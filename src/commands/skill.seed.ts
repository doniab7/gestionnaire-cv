import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Skill } from '../entities/skill.entity';
import { Cv } from '../entities/cv.entity';
import { User } from '../entities/user.entity';
import { SkillFactory } from '../factories/skill.factory';
import SkillSeeder from './skill.seeder';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 3306,
  username: DB_USER || 'root',
  password: DB_PASSWORD || 'sql123',
  database: DB_NAME || 'test',
  entities: [Skill, Cv, User],
  // additional config options brought by typeorm-extension
  factories: [SkillFactory],
  seeds: [SkillSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
