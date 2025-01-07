import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { setupCookieParser } from '@/config/cookie-parser';
import { setupCors } from '@/config/cors';
import { setupSwagger } from '@/config/swagger';
import { PrismaExceptionFilter } from '@/filters/prisma-exception.filter';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const port = configService.get<string>('port');
  const hostname = configService.get<string>('hostname');

  app.useGlobalFilters(new PrismaExceptionFilter());

  setupCors(app);
  setupCookieParser(app);
  setupSwagger(app);

  await app.listen(port, hostname);

  console.log(`Application is running on: http://${hostname}:${port}`);
}
bootstrap().catch(console.error);
