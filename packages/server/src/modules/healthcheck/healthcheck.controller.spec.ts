import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { HealthcheckController } from './healthcheck.controller';

describe('HealthcheckController', () => {
  let controller: HealthcheckController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthcheckController],
    }).compile();

    controller = module.get<HealthcheckController>(HealthcheckController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return status ok on healthcheck', () => {
    const result = controller.healthcheck();
    expect(result).toEqual({ status: 'ok' });
  });
});
