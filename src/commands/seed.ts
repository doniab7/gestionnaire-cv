import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { runSeeders, SeederOptions } from 'typeorm-extension';
import { Cv } from '../entities/cv.entity';
import { CvFactory } from '../factories/cv.factory';
import CvSeeder from './cv.seeder';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: DB_HOST || 'localhost',
  port: Number(DB_PORT) || 3306,
  username: DB_USER || 'root',
  password: DB_PASSWORD || 'sql123',
  database: DB_NAME || 'test',
  entities: [Cv],
  // additional config options brought by typeorm-extension
  factories: [CvFactory],
  seeds: [CvSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});
