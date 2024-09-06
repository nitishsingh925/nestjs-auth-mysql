import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('NestJS Auth')
    .setDescription('Nest js auth api Description')
    .addCookieAuth('access_token', { type: 'apiKey', in: 'cookie' })
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'AbhiOrder',
        description: 'Enter JWT Token (accessToken)',
      },
      'accessToken',
    )
    .setExternalDoc(
      'swagger-json(" now use in postman to import json")',
      '/swagger-json',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Expose Swagger JSON document at /swagger-json
  app.use('/swagger-json', (_, res) => {
    res.send(document);
  });

  if (process.env.APP_PORT === undefined) {
    throw new Error(
      'APP_PORT environment variable is not defined set in .env file ',
    );
  }
  await app.listen(process.env.APP_PORT);
}
bootstrap();
