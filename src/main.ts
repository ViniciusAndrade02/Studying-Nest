import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['wefwef'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //irá excluir um variavel estranho
    }),
  );
  await app.listen(3000);
}
bootstrap();
