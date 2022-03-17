import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const configs = config.database;

export default {
  ...configs,
  entities: ['dist/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    entitiesDir: 'src/modules/**/*.entity{.ts,.js}',
  },
} as TypeOrmModuleOptions;
