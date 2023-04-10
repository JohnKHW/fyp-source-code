import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initialize, setupSwagger } from './utils/helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  initialize(app);
  setupSwagger(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
