import { Body, Controller, Get, Post, Query, UsePipes } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  FarmCreateRequestBody,
  FarmCreateResponse,
  FarmFindAllQueryParams,
  FarmFindAllResponse,
  FarmFindAllResponseContent,
} from 'brain-agriculture-backend-types';

import { ApiOkPaginated } from '@/decorators/api-ok-paginated/api-ok-paginated.decorator';
import { SchemaValidationPipe } from '@/shared/schema-validation';
import { paginationQuerySchema } from '@/shared/schemas/pagination-query-schema';

import { farmCreateBodySchema } from '../schemas/farm-create-body.schema';
import { FarmService } from '../service/farm.service';

@ApiTags('farm')
@Controller('farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @ApiCreatedResponse({
    description: 'The farm has been successfully created.',
    type: FarmCreateResponse,
  })
  @ApiBody({ type: FarmCreateResponse })
  @UsePipes(new SchemaValidationPipe(farmCreateBodySchema))
  @Post()
  public async create(
    @Body() body: FarmCreateRequestBody,
  ): Promise<FarmCreateResponse> {
    return this.farmService.create(body);
  }

  @ApiOkPaginated({
    description: 'The farms have been successfully found.',
    type: FarmFindAllResponseContent,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @Get()
  public async findAll(
    @Query(new SchemaValidationPipe(paginationQuerySchema))
    queryParams: FarmFindAllQueryParams,
  ): Promise<FarmFindAllResponse> {
    return await this.farmService.findAll(queryParams);
  }
}
