import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'secret',
  database: 'busness',
  entities: [
    __dirname + '/../**/*.entity.js',
    __dirname + '/../**/*-entity.js',
  ],
  synchronize: true,
};
