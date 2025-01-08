import { BadRequestException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Prisma } from '@prisma/client';
import type { FarmFindAllResponseContent } from 'brain-agriculture-backend-types';
import { mockDeep } from 'jest-mock-extended';

import { paginationFactory, queryParamsFactory } from '@/shared/factories';
import { PaginateService } from '@/shared/paginate/paginate.service';

import { FarmService } from '../service/farm.service';
import { FarmController } from './farm.controller';

describe('FarmController', () => {
  let controller: FarmController;
  let farmService: FarmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmController],
      providers: [
        {
          provide: FarmService,
          useValue: mockDeep<FarmService>(),
        },
        {
          provide: PaginateService,
          useValue: mockDeep<PaginateService>(),
        },
      ],
    }).compile();

    controller = module.get<FarmController>(FarmController);
    farmService = module.get<FarmService>(FarmService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
    jest.spyOn(farmService, 'create').mockResolvedValue(createdFarm);

    const result = await controller.create(farmData);

    expect(result).toEqual(createdFarm);
    expect(farmService.create).toHaveBeenCalledWith(farmData);
  });

  it('should throw an error when creating a farm with invalid data', async () => {
    const farmData = {
      arableArea: 70,
      city: 'São Paulo',
      farmerId: 1,
      name: 'Farm 1',
      state: 'SP',
      totalArea: 100,
      vegetationArea: 40,
    } as Prisma.FarmGetPayload<null>;

    jest
      .spyOn(farmService, 'create')
      .mockRejectedValue(
        new BadRequestException(
          'Arable area + vegetation area are bigger than farm area',
        ),
      );

    await expect(controller.create(farmData)).rejects.toThrow(
      BadRequestException,
    );
    expect(farmService.create).toHaveBeenCalledWith(farmData);
  });

  it('should return paginated farms successfully', async () => {
    const queryParams = queryParamsFactory();

    const paginatedResult = paginationFactory<FarmFindAllResponseContent>();

    jest.spyOn(farmService, 'findAll').mockResolvedValue(paginatedResult);

    const result = await controller.findAll(queryParams);

    expect(result).toEqual(paginatedResult);
    expect(farmService.findAll).toHaveBeenCalledWith(queryParams);
  });

  it('should throw an error when fetching farms with invalid query params', async () => {
    const queryParams = queryParamsFactory({ page: -1 });

    jest
      .spyOn(farmService, 'findAll')
      .mockRejectedValue(new BadRequestException('Invalid query parameters'));

    await expect(controller.findAll(queryParams)).rejects.toThrow(
      BadRequestException,
    );
    expect(farmService.findAll).toHaveBeenCalledWith(queryParams);
  });
});
