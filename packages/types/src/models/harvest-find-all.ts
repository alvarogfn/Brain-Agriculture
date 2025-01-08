import { ApiProperty } from '@nestjs/swagger';
import { Paginated, PaginationParams } from 'shared/pagination';

export class HarvestFindAllQueryParams extends PaginationParams {}

export class HarvestFindAllResponseContent {
  @ApiProperty({
    description: 'Array of crop ids.',
    example: [1, 2, 3],
  })
  crops: number[];

  @ApiProperty({
    description: 'Farm id',
    example: 'Farm S/A',
  })
  farmId: number;

  @ApiProperty({
    description: 'Harvest id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Harvest year',
  })
  year: string;
}

export class HarvestFindAllResponse extends Paginated<HarvestFindAllResponseContent> {}
