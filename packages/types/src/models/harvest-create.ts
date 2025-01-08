import { ApiProperty } from '@nestjs/swagger';

export class HarvestCreateRequestBody {
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
    description: 'Harvest name',
  })
  name: string;

  @ApiProperty({
    description: 'Harvest year',
  })
  year: string;
}

export class HarvestCreateResponse {
  @ApiProperty({
    description: 'Harvest creation date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Array of crop ids.',
    example: [1, 2, 3],
  })
  crops: number[];

  @ApiProperty({
    description: 'Farm id',
    example: 1,
  })
  farmId: number;

  @ApiProperty({
    description: 'Harvest id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Harvest name',
  })
  name: string;

  @ApiProperty({
    description: 'Harvest update date',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Harvest year',
  })
  year: string;
}
