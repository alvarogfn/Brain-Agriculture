import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import env from '@/config/env';
import { HealthcheckModule } from '@/modules/healthcheck/healthcheck.module';
import { SharedModule } from '@/shared/shared.module';

import { CropModule } from './modules/crop/crop.module';
import { FarmModule } from './modules/farm/farm.module';
import { FarmerModule } from './modules/farmer/farmer.module';
import { HarvestModule } from './modules/harvest/harvest.module';

const MODE = process.env.MODE ?? 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${MODE}`],
      isGlobal: true,
      load: [env],
    }),
    HealthcheckModule,
    FarmerModule,
    FarmModule,
    HarvestModule,
    CropModule,
    SharedModule,
  ],
})
export class AppModule {}
