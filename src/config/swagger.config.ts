import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('NestJS Auth')
    .setDescription('NestJS auth API Description')
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
}
