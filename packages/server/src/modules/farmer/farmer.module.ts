import { Module } from '@nestjs/common';

import { PrismaModule } from '@/database/prisma.module';
import { FarmerService } from '@/modules/farmer/service/farmer.service';
import { SharedModule } from '@/shared/shared.module';

import { FarmerController } from './controller/farmer.controller';

@Module({
  controllers: [FarmerController],
  imports: [PrismaModule, SharedModule],
  providers: [FarmerService],
})
export class FarmerModule {}
