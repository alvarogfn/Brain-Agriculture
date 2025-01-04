import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import env from '@/config/env';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthcheckModule } from './healthcheck/healthcheck.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [env],
    }),
    HealthcheckModule,
  ],
  providers: [AppService],
})
export class AppModule {}
