import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import type {
  HarvestCreateRequestBody,
  HarvestCreateResponse,
  HarvestFindAllQueryParams,
  HarvestFindAllResponse,
} from 'brain-agriculture-backend-types';

import { PrismaService } from '@/database/prisma.service';
import { PaginateService } from '@/shared/paginate/paginate.service';

@Injectable()
export class HarvestService {
  constructor(
    private prisma: PrismaService,
    private pagination: PaginateService,
  ) {}

  public async create({
    crops,
    farmId,
    name,
    year,
  }: HarvestCreateRequestBody): Promise<HarvestCreateResponse> {
    const data = await this.prisma.harvest.create({
      data: {
        crops: {
          connect: [...crops.map((crop) => ({ id: crop }))],
        },
        farm: {
          connect: { id: farmId },
        },
        name,
        year,
      },
      include: { crops: { select: { id: true } } },
    });

    return {
      ...data,
      crops: [1, 2],
      farmId: data.farmId,
      id: data.id,
      year: data.year,
    };
  }

  public async findAll(
    params: HarvestFindAllQueryParams,
  ): Promise<HarvestFindAllResponse> {
    const where: Prisma.HarvestWhereInput = {
      OR: [{ name: { contains: params.searchTerm, mode: 'insensitive' } }],
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.harvest.count({
        where: params.searchTerm ? where : {},
      }),

      this.prisma.harvest.findMany({
        include: { crops: { select: { id: true } } },
        skip: Math.max(params.page - 1, 0) * params.size,
        take: params.size,
        where: params.searchTerm ? where : {},
      }),
    ]);

    const content = data.map((harvest) => ({
      crops: harvest.crops.map((crop) => crop.id),
      farmId: harvest.farmId,
      id: harvest.id,
      year: harvest.year,
    }));

    return this.pagination.execute({ data: content, total, ...params });
  }
}
