import { ApiProperty } from '@nestjs/swagger';
import { Paginated, PaginationParams } from 'shared/pagination';

export class FarmFindAllQueryParams extends PaginationParams {}

export class FarmFindAllResponseContent {
  @ApiProperty({
    description:
      'Farm arable area in hectares, should be less than total Farm Area - Vegetation Area',
  })
  arableArea: number;

  @ApiProperty({
    description: 'Farm City',
    example: 'São Paulo',
  })
  city: string;

  @ApiProperty({
    description: 'Farm creation date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Farmer id',
  })
  farmerId: number;

  @ApiProperty({
    description: 'Farm id',
  })
  id: number;

  @ApiProperty({
    description: 'Farm name',
  })
  name: string;

  @ApiProperty({
    description: 'Farm State',
    example: 'SP',
  })
  state: string;

  @ApiProperty({
    description: 'Farm total area in hectares',
  })
  totalArea: number;

  @ApiProperty({
    description: 'Farm update date',
  })
  updatedAt: Date;

  @ApiProperty({
    description:
      'Farm vegetation area in hectares, should be less than farm area - Arable Area',
    example: '12',
  })
  vegetationArea: number;
}

export class FarmFindAllResponse extends Paginated<FarmFindAllResponseContent> {}
