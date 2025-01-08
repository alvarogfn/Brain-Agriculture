import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Prisma } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';

import { PrismaService } from '@/database/prisma.service';
import { paginationFactory, queryParamsFactory } from '@/shared/factories';
import { PaginateService } from '@/shared/paginate/paginate.service';

import { HarvestService } from './harvest.service';

describe('FarmerService', () => {
  let service: HarvestService;
  let prismaService: PrismaService;
  let paginateService: PaginateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HarvestService,
        { provide: PrismaService, useValue: mockDeep<PrismaService>() },
        { provide: PaginateService, useValue: mockDeep<PaginateService>() },
      ],
    }).compile();

    service = module.get<HarvestService>(HarvestService);

    prismaService = module.get<PrismaService>(PrismaService);

    paginateService = module.get<PaginateService>(PaginateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a harvest successfully', async () => {
    const harvestData = {
      crops: [1, 2],
      farmId: 1,
      name: 'Harvest 1',
      year: '2023',
    };

    const createdHarvest = { ...harvestData, id: 1 };

    jest
      .spyOn(prismaService.harvest, 'create')
      .mockResolvedValue(
        createdHarvest as unknown as Prisma.HarvestGetPayload<null>,
      );

    const result = await service.create(harvestData);

    expect(result).toEqual({
      ...createdHarvest,
      crops: [1, 2],
    });
    expect(prismaService.harvest.create).toHaveBeenCalledWith({
      data: {
        crops: { connect: [{ id: 1 }, { id: 2 }] },
        farm: { connect: { id: 1 } },
        name: 'Harvest 1',
        year: '2023',
      },
      include: { crops: { select: { id: true } } },
    });
  });

  it('should return paginated harvests successfully', async () => {
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
