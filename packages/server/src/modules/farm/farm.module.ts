import { Module } from '@nestjs/common';

import { FarmController } from './controller/farm.controller';

@Module({
  controllers: [FarmController],
})
export class FarmModule {}
