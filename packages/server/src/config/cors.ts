import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export function setupCors(app: INestApplication) {
  const configService = app.get(ConfigService);

  const origin = configService.get<string>('origin');

  app.enableCors({
    credentials: true,
    origin: origin,
  });
}
