import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  HttpExceptionFilter,
  ServerErrorExceptionFilter,
} from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalFilters(new ServerErrorExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().then(() => console.log('Application started'));
