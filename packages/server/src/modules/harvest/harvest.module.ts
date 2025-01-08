import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';
import { SharedModule } from '@/shared/shared.module';

import { HarvestController } from './controller/harvest.controller';
import { HarvestService } from './service/harvest.service';

@Module({
  controllers: [HarvestController],
  imports: [PrismaModule, SharedModule],
  providers: [HarvestService],
})
export class HarvestModule {}
