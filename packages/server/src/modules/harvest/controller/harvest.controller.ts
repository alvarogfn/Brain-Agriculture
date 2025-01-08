import {
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  HarvestCreateRequestBody,
  HarvestCreateResponse,
  HarvestFindAllQueryParams,
  HarvestFindAllResponse,
  HarvestFindAllResponseContent,
} from 'brain-agriculture-backend-types';

import { ApiOkPaginated } from '@/decorators/api-ok-paginated/api-ok-paginated.decorator';
import { SchemaValidationPipe } from '@/shared/schema-validation';
import { paginationQuerySchema } from '@/shared/schemas/pagination-query-schema';

import { harvestCreateBodySchema } from '../schemas/harvest-create-body.schema';
import { HarvestService } from '../service/harvest.service';

@ApiTags('harvest')
@Controller('harvest')
export class HarvestController {
  constructor(private readonly harvestService: HarvestService) {}

  @ApiCreatedResponse({
    description: 'The harvest has been successfully created.',
    type: HarvestCreateResponse,
  })
  @ApiBody({ type: HarvestCreateResponse })
  @UsePipes(new SchemaValidationPipe(harvestCreateBodySchema))
  @Post()
  public async create(
    @Body() body: HarvestCreateRequestBody,
  ): Promise<HarvestCreateResponse> {
    return this.harvestService.create(body);
  }

  @ApiOkPaginated({
    description: 'The harvests have been successfully found.',
    type: HarvestFindAllResponseContent,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @Get()
  public async findAll(
    @Query(new SchemaValidationPipe(paginationQuerySchema))
    queryParams: HarvestFindAllQueryParams,
  ): Promise<HarvestFindAllResponse> {
    return await this.harvestService.findAll(queryParams);
  }
}
