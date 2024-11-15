import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const app = await NestFactory.create(AppModule);
  await app.listen(envs.port);
  app.setGlobalPrefix('api');
  logger.log(`Gateway running on port ${envs.port}`);
}
bootstrap();
