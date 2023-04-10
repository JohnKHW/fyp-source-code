import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export const initialize = (app: INestApplication) => {
  app.enableVersioning();

  // Enable CORS by default because Swagger UI required
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix(process.env.BASE_PATH);
};

export const setupSwagger = (app: INestApplication) => {
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('FYP API Document')
    .setDescription('This is a basic Swagger document.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_BASE_PATH, app, document);
};
