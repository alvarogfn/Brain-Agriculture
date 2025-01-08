import { BadRequestException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Prisma } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/prisma.service';
import { paginationFactory, queryParamsFactory } from '@/shared/factories';
import { PaginateService } from '@/shared/paginate/paginate.service';

import { FarmService } from './farm.service';

describe('FarmService', () => {
  let service: FarmService;
  let prismaService: PrismaService;
  let paginateService: PaginateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FarmService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        { provide: PaginateService, useValue: mockDeep<PaginateService>() },
      ],
    }).compile();

    service = module.get<FarmService>(FarmService);

    prismaService = module.get<PrismaService>(PrismaService);

    paginateService = module.get<PaginateService>(PaginateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a farm successfully', async () => {
    const farmData = {
      arableArea: 50,
      city: 'São Paulo',
      farmerId: 1,
      name: 'Farm 1',
      state: 'SP',
      totalArea: 100,
      vegetationArea: 30,
    } as Prisma.FarmGetPayload<null>;
    const createdFarm = { ...farmData, id: 1 };
    jest.spyOn(prismaService.farm, 'create').mockResolvedValue(createdFarm);

    const result = await service.create(farmData);

    expect(result).toEqual(createdFarm);
    expect(prismaService.farm.create).toHaveBeenCalledWith({ data: farmData });
  });

  it('should throw BadRequestException when arable area + vegetation area is greater than total area', async () => {
    const farmData = {
      arableArea: 70,
      city: 'São Paulo',
      farmerId: 1,
      name: 'Farm 1',
      state: 'SP',
      totalArea: 100,
      vegetationArea: 40,
    } as Prisma.FarmGetPayload<null>;

    await expect(service.create(farmData)).rejects.toThrow(BadRequestException);
  });

  it('should return paginated farms successfully', async () => {
    const queryParams = queryParamsFactory();
    const paginatedResult = paginationFactory();

    jest.spyOn(prismaService, '$transaction').mockResolvedValue([0, []]);
    jest.spyOn(paginateService, 'execute').mockReturnValue(paginatedResult);

    const result = await service.findAll(queryParams);

    expect(result).toEqual(paginatedResult);
    expect(prismaService.$transaction).toHaveBeenCalled();
    expect(paginateService.execute).toHaveBeenCalledWith({
      data: [],
      total: 0,
      ...queryParams,
    });
  });
});
