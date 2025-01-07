import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CNPJValidationService } from './cnpj-validation.service';

describe('CNPJValidationService', () => {
  let service: CNPJValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CNPJValidationService],
    }).compile();

    service = module.get<CNPJValidationService>(CNPJValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
