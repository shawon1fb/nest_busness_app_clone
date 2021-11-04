import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // app.useGlobalFilters(new ServerErrorExceptionFilter());
  //  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(8080);
  console.log(`Application is running on: ${await app.getUrl()}`);

  // const server = app.getHttpServer();
  // const router = server._events.request._router;
  //
  // const availableRoutes: [] = router.stack
  //   .map((layer) => {
  //     if (layer.route) {
  //       return {
  //         route: {
  //           path: layer.route?.path,
  //           method: layer.route?.stack[0].method,
  //         },
  //       };
  //     }
  //   })
  //   .filter((item) => item !== undefined);
  // console.log(availableRoutes);
}

bootstrap().then(() => console.log('Application started'));
