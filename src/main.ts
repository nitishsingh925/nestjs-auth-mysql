import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // Setup Swagger documentation
  setupSwagger(app);

  if (process.env.APP_PORT === undefined) {
    throw new Error(
      'APP_PORT environment variable is not defined set in .env file ',
    );
  }
  await app.listen(process.env.APP_PORT);
}
bootstrap();
