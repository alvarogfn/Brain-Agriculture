import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { CPFValidationService } from './cpf-validation.service';

describe('CPFValidationHelper', () => {
  let service: CPFValidationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CPFValidationService],
    }).compile();

    service = module.get<CPFValidationService>(CPFValidationService);
  });

  it('should return true for a valid CPF', () => {
    const validCPF = '12345678909';
    expect(service.execute(validCPF)).toBe(true);
  });

  it('should return false for a CPF with invalid length', () => {
    const invalidCPF = '123456789';
    expect(service.execute(invalidCPF)).toBe(false);
  });

  it('should return false for a CPF with all identical digits', () => {
    const identicalDigitsCPF = '11111111111';
    expect(service.execute(identicalDigitsCPF)).toBe(false);
  });

  it('should return false for a CPF with invalid verifier digits', () => {
    const invalidVerifierCPF = '12345678900';
    expect(service.execute(invalidVerifierCPF)).toBe(false);
  });

  it('should return false for a CPF with non-digit characters', () => {
    const nonDigitCPF = '123.456.789-09';
    expect(service.execute(nonDigitCPF)).toBe(false);
  });
});
