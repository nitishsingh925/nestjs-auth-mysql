import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  if (process.env.APP_PORT === undefined) {
    throw new Error('APP_PORT environment variable is not defined');
  }
  await app.listen(process.env.APP_PORT);
}
bootstrap();
