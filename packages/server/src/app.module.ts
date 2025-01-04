import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import env from '@/config/env';
import { HealthcheckModule } from '@/modules/healthcheck/healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    HealthcheckModule,
  ],
})
export class AppModule {}
