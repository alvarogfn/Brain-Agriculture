import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  FarmerCreateRequestBody,
  FarmerCreateResponse,
  FarmerFindAllQueryParams,
  FarmerFindAllResponse,
} from 'brain-agriculture-backend-types';

import { PrismaService } from '@/database/prisma.service';
import { CNPJValidationService } from '@/shared/cnpj-validation/cnpj-validation.service';
import { CPFValidationService } from '@/shared/cpf-validation/cpf-validation.service';
import { PaginateService } from '@/shared/paginate/paginate.service';

@Injectable()
export class FarmerService {
  constructor(
    private prisma: PrismaService,
    private CPFValidation: CPFValidationService,
    private CNPJValidation: CNPJValidationService,
    private pagination: PaginateService,
  ) {}

  public async create({
    documentId,
    name,
  }: FarmerCreateRequestBody): Promise<FarmerCreateResponse> {
    const isCPF = this.CPFValidation.execute(documentId);
    const isCNPJ = this.CNPJValidation.execute(documentId);

    if (!isCPF && !isCNPJ) {
      throw new BadRequestException('Invalid document ID');
    }

    return this.prisma.farmer.create({
      data: { documentId: documentId, name: name },
    });
  }

  public async findAll(
    params: FarmerFindAllQueryParams,
  ): Promise<FarmerFindAllResponse> {
    const where: Prisma.FarmerWhereInput = {
      OR: [
        { documentId: { contains: params.searchTerm, mode: 'insensitive' } },
        { name: { contains: params.searchTerm, mode: 'insensitive' } },
      ],
    };

    const [total, data] = await this.prisma.$transaction([
      this.prisma.farmer.count({
        where: params.searchTerm ? where : {},
      }),

      this.prisma.farmer.findMany({
        skip: Math.max(params.page - 1, 0) * params.size,
        take: params.size,
        where: params.searchTerm ? where : {},
      }),
    ]);

    return this.pagination.execute({ data, total, ...params });
  }
}
