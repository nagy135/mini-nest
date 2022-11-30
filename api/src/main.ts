import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://mini-app.infiniter.eu'
    ],
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS', 'HEAD'],
  });

  await app.listen(3000);
}
bootstrap();
