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
  FarmerCreateRequestBody,
  FarmerCreateResponse,
  FarmerFindAllQueryParams,
  FarmerFindAllResponse,
  FarmerFindAllResponseContent,
} from 'brain-agriculture-backend-types';

import { ApiOkPaginated } from '@/decorators/api-ok-paginated/api-ok-paginated.decorator';
import { SchemaValidationPipe } from '@/shared/schema-validation';
import { paginationQuerySchema } from '@/shared/schemas/pagination-query-schema';

import { farmerCreateBodySchema } from '../schemas/farmer-create-body.schema';
import { FarmerService } from '../service/farmer.service';

@ApiTags('farmer')
@Controller('farmer')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @ApiCreatedResponse({
    description: 'The farmer has been successfully created.',
    type: FarmerCreateResponse,
  })
  @ApiBody({ type: FarmerCreateResponse })
  @UsePipes(new SchemaValidationPipe(farmerCreateBodySchema))
  @Post()
  public async create(
    @Body() body: FarmerCreateRequestBody,
  ): Promise<FarmerCreateResponse> {
    return this.farmerService.create(body);
  }

  @ApiOkPaginated({
    description: 'The farmers have been successfully found.',
    type: FarmerFindAllResponseContent,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
  })
  @Get()
  public async findAll(
    @Query(new SchemaValidationPipe(paginationQuerySchema))
    queryParams: FarmerFindAllQueryParams,
  ): Promise<FarmerFindAllResponse> {
    return await this.farmerService.findAll(queryParams);
  }
}
