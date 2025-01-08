import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  FarmCreateRequestBody,
  FarmCreateResponse,
  FarmFindAllQueryParams,
  FarmFindAllResponse,
} from 'brain-agriculture-backend-types';

import { PrismaService } from '@/database/prisma.service';
import { PaginateService } from '@/shared/paginate/paginate.service';

@Injectable()
export class FarmService {
  constructor(
    private prisma: PrismaService,
    private pagination: PaginateService,
  ) {}

  public async create({
    arableArea,
    city,
    farmerId,
    name,
    state,
    totalArea,
    vegetationArea,
  }: FarmCreateRequestBody): Promise<FarmCreateResponse> {
    const isBiggerThanArea = arableArea + vegetationArea > totalArea;

    if (isBiggerThanArea) {
      throw new BadRequestException(
        'Arable area + vegetation area are bigger than farm area',
      );
    }

    return this.prisma.farm.create({
      data: {
        arableArea,
        city,
        farmerId,
        name,
        state,
        totalArea,
        vegetationArea,
      },
    });
  }

  public async findAll(
    params: FarmFindAllQueryParams,
  ): Promise<FarmFindAllResponse> {
    const where: Prisma.FarmWhereInput = {
      OR: [{ name: { contains: params.searchTerm, mode: 'insensitive' } }],
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.farm.count({
        where: params.searchTerm ? where : {},
      }),

      this.prisma.farm.findMany({
        skip: Math.max(params.page - 1, 0) * params.size,
        take: params.size,
        where: params.searchTerm ? where : {},
      }),
    ]);

    return this.pagination.execute({ data, total, ...params });
  }
}
