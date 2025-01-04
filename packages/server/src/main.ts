import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);

  const configService = app.get(ConfigService);

  const port = configService.get<string>('port');
  const hostname = configService.get<string>('hostname');
  const origin = configService.get<string>('origin');

  app.enableCors({
    credentials: true,
    origin: origin,
  });

  console.log(`Application is running on: http://${hostname}:${port}`);
}
bootstrap().catch(console.error);
