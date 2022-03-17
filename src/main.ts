import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';

async function bootstrap() {
  //const host = config.get('server.host');
  const port = config.get('server.port');

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      skipMissingProperties: true,
    }),
  );

  await app.listen(port);

  Logger.log(`[PORT]: ${port}`);
  Logger.log(`[ENVIROMENT]: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap();
