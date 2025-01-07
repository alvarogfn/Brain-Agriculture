import { Test, TestingModule } from '@nestjs/testing';
import { FarmerController } from './farmer.controller';
import { FarmerService } from '../service/farmer.service';
import { mock } from 'jest-mock-extended';
import { Prisma } from '@prisma/client';
import { BadRequestException } from '@nestjs/common';
import { paginationFactory, queryParamsFactory } from '@/shared/factories';
import { FarmerFindAllResponseContent } from 'brain-agriculture-backend-types';

describe('FarmerController', () => {
  let controller: FarmerController;
  let farmerService: FarmerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FarmerController],
      providers: [{ provide: FarmerService, useValue: mock<FarmerService>() }],
    }).compile();

    controller = module.get<FarmerController>(FarmerController);
    farmerService = module.get<FarmerService>(FarmerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a farmer successfully', async () => {
    const farmerData = { documentId: '12345678909', name: 'John Doe' };
    const createdFarmer = {
      ...farmerData,
      id: 1,
    } as Prisma.FarmerGetPayload<null>;

    jest.spyOn(farmerService, 'create').mockResolvedValue(createdFarmer);

    const result = await controller.create(farmerData);

    expect(result).toEqual(createdFarmer);
    expect(farmerService.create).toHaveBeenCalledWith(farmerData);
  });

  it('should throw an error when creating a farmer with invalid data', async () => {
    const farmerData = { documentId: null, name: 'John Doe' };
    jest
      .spyOn(farmerService, 'create')
      .mockRejectedValue(new BadRequestException('Invalid document ID'));

    await expect(controller.create(farmerData)).rejects.toThrow(
      BadRequestException,
    );
    expect(farmerService.create).toHaveBeenCalledWith(farmerData);
  });

  it('should return paginated farmers successfully', async () => {
    const queryParams = queryParamsFactory();

    const paginatedResult = paginationFactory<FarmerFindAllResponseContent>();

    jest.spyOn(farmerService, 'findAll').mockResolvedValue(paginatedResult);

    const result = await controller.findAll(queryParams);

    expect(result).toEqual(paginatedResult);
    expect(farmerService.findAll).toHaveBeenCalledWith(queryParams);
  });

  it('should throw an error when fetching farmers with invalid query params', async () => {
    const queryParams = queryParamsFactory({ page: -1 });

    jest
      .spyOn(farmerService, 'findAll')
      .mockRejectedValue(new BadRequestException('Invalid query parameters'));

    await expect(controller.findAll(queryParams)).rejects.toThrow(
      BadRequestException,
    );
    expect(farmerService.findAll).toHaveBeenCalledWith(queryParams);
  });
});
