import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';
import { SharedModule } from '@/shared/shared.module';

import { FarmController } from './controller/farm.controller';
import { FarmService } from './service/farm.service';

@Module({
  controllers: [FarmController],
  imports: [PrismaModule, SharedModule],
  providers: [FarmService],
})
export class FarmModule {}
