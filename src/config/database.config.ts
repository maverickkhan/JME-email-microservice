import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { BellAlert } from 'src/bell-alert/entities/bell-alert.entity';
dotenv.config();



const dbConfig = {
  host:
    process.env.TYPE_ORM_DATABASE_HOST ||
    `127.0.0.1`,
  port: process.env.TYPE_ORM_DATABASE_PORT || 5432,
  username: process.env.TYPE_ORM_DATABASE_USERNAME || 'postgres',
  password: process.env.TYPE_ORM_DATABASE_PASSWORD || '5894',
  name: process.env.TYPE_ORM_DATABASE_NAME || `microservice`,
};

console.log(dbConfig);

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: +dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.name,
  logging: false,
  entities: [
    BellAlert,
  ],
  // migrations: ['migration/*.js'],
  // migrationsRun: true,
  synchronize: false,
};