import { BadRequestException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Prisma } from '@prisma/client';
import type { HarvestFindAllResponseContent } from 'brain-agriculture-backend-types';
import { mock } from 'jest-mock-extended';

import { paginationFactory, queryParamsFactory } from '@/shared/factories';

import { HarvestService } from '../service/harvest.service';
import { HarvestController } from './harvest.controller';

describe('HarvestController', () => {
  let controller: HarvestController;
  let harvestService: HarvestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HarvestController],
      providers: [
        { provide: HarvestService, useValue: mock<HarvestService>() },
      ],
    }).compile();

    controller = module.get<HarvestController>(HarvestController);
    harvestService = module.get<HarvestService>(HarvestService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a harvest successfully', async () => {
    const harvestData = {
      createdAt: new Date(),
      crops: [1, 2],
      farmId: 1,
      name: 'Harvest 1',
      updatedAt: new Date(),
      year: '2023',
    };
    const createdHarvest = { ...harvestData, id: 1 };

    jest.spyOn(harvestService, 'create').mockResolvedValue(createdHarvest);

    const result = await controller.create(harvestData);

    expect(result).toEqual(createdHarvest);
    expect(harvestService.create).toHaveBeenCalledWith(harvestData);
  });

  it('should throw an error when creating a harvest with invalid data', async () => {
    const harvestData = {
      crops: [],
      farmId: 1,
      name: 'Harvest 1',
      year: '2023',
    };
    jest
      .spyOn(harvestService, 'create')
      .mockRejectedValue(new BadRequestException('Invalid crops data'));

    await expect(controller.create(harvestData)).rejects.toThrow(
      BadRequestException,
    );
    expect(harvestService.create).toHaveBeenCalledWith(harvestData);
  });

  it('should return paginated harvests successfully', async () => {
    const queryParams = queryParamsFactory();
    const paginatedResult = paginationFactory<HarvestFindAllResponseContent>();
    jest.spyOn(harvestService, 'findAll').mockResolvedValue(paginatedResult);

    const result = await controller.findAll(queryParams);

    expect(result).toEqual(paginatedResult);
    expect(harvestService.findAll).toHaveBeenCalledWith(queryParams);
  });

  it('should throw an error when fetching harvests with invalid query params', async () => {
    const queryParams = queryParamsFactory({ page: -1 });

    jest
      .spyOn(harvestService, 'findAll')
      .mockRejectedValue(new BadRequestException('Invalid query parameters'));

    await expect(controller.findAll(queryParams)).rejects.toThrow(
      BadRequestException,
    );
    expect(harvestService.findAll).toHaveBeenCalledWith(queryParams);
  });
});
