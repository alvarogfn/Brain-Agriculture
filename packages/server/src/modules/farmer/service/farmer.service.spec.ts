import { BadRequestException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { PrismaService } from '@/database/prisma.service';
import { CNPJValidationService } from '@/shared/cnpj-validation/cnpj-validation.service';
import { CPFValidationService } from '@/shared/cpf-validation/cpf-validation.service';
import { PaginateService } from '@/shared/paginate/paginate.service';
import { mock, mockDeep } from 'jest-mock-extended';
import { FarmerService } from './farmer.service';
import { Prisma } from '@prisma/client';
import { PaginationParams } from 'brain-agriculture-backend-types';
import { paginationFactory, queryParamsFactory } from '@/shared/factories';

describe('FarmerService', () => {
  let service: FarmerService;
  let prismaService: PrismaService;
  let cpfValidationService: CPFValidationService;
  let cnpjValidationService: CNPJValidationService;
  let paginateService: PaginateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmerService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        {
          provide: CPFValidationService,
          useValue: mockDeep<CPFValidationService>(),
        },
        {
          provide: CNPJValidationService,
          useValue: mockDeep<CNPJValidationService>(),
        },
        { provide: PaginateService, useValue: mockDeep<PaginateService>() },
      ],
    }).compile();

    service = module.get<FarmerService>(FarmerService);

    prismaService = module.get<PrismaService>(PrismaService);

    cpfValidationService =
      module.get<CPFValidationService>(CPFValidationService);

    cnpjValidationService = module.get<CNPJValidationService>(
      CNPJValidationService,
    );

    paginateService = module.get<PaginateService>(PaginateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a farmer with valid CPF', async () => {
    const farmerData = {
      documentId: '12345678909',
      name: 'John Doe',
    } as Prisma.FarmerGetPayload<null>;

    jest.spyOn(cpfValidationService, 'execute').mockReturnValue(true);
    jest.spyOn(cnpjValidationService, 'execute').mockReturnValue(false);
    jest.spyOn(prismaService.farmer, 'create').mockResolvedValue(farmerData);

    const result = await service.create(farmerData);

    expect(result).toEqual(farmerData);
    expect(prismaService.farmer.create).toHaveBeenCalledWith({
      data: farmerData,
    });
  });

  it('should create a farmer with valid CNPJ', async () => {
    const farmerData = {
      documentId: '12345678000195',
      name: 'John Doe',
    } as Prisma.FarmerGetPayload<null>;

    jest.spyOn(cpfValidationService, 'execute').mockReturnValue(false);
    jest.spyOn(cnpjValidationService, 'execute').mockReturnValue(true);
    jest.spyOn(prismaService.farmer, 'create').mockResolvedValue(farmerData);

    const result = await service.create(farmerData);

    expect(result).toEqual(farmerData);
    expect(prismaService.farmer.create).toHaveBeenCalledWith({
      data: farmerData,
    });
  });

  it('should throw BadRequestException for invalid document ID', async () => {
    const farmerData = {
      documentId: 'invalid',
      name: 'John Doe',
    } as Prisma.FarmerGetPayload<null>;

    jest.spyOn(cpfValidationService, 'execute').mockReturnValue(false);
    jest.spyOn(cnpjValidationService, 'execute').mockReturnValue(false);

    await expect(service.create(farmerData)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return paginated farmers', async () => {
    const params = queryParamsFactory();

    const paginatedResult = paginationFactory();

    jest.spyOn(prismaService, '$transaction').mockResolvedValue([0, []]);
    jest.spyOn(paginateService, 'execute').mockReturnValue(paginatedResult);

    const result = await service.findAll(params);

    expect(result).toEqual(paginatedResult);
    expect(prismaService.$transaction).toHaveBeenCalled();
    expect(paginateService.execute).toHaveBeenCalledWith({
      data: [],
      total: 0,
      ...params,
    });
  });
});
