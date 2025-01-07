import { ApiProperty } from '@nestjs/swagger';

export class Paginated<Content> {
  @ApiProperty({
    description: 'List of each page content',
  })
  content: Content[];

  @ApiProperty({
    description: 'Is the first page',
  })
  first: boolean;

  @ApiProperty({
    description: 'Is the last page',
  })
  last: boolean;

  @ApiProperty({
    description: 'Number of the current page',
  })
  page: number;

  @ApiProperty({
    description: 'Number of total pages',
  })
  pages: number;

  @ApiProperty({
    description: 'Number of elements in each page',
  })
  size: number;

  @ApiProperty({
    description: 'Total number of elements',
  })
  total: number;
}

export class PaginationParams {
  @ApiProperty({
    description: 'Number of the current page',
    required: false,
  })
  page?: number;

  @ApiProperty({
    description: 'Search term',
    required: false,
  })
  searchTerm?: string;

  @ApiProperty({
    description: 'Number of elements in each page',
    required: false,
  })
  size?: number;

  @ApiProperty({
    description: 'List of fields to sort',
    required: false,
  })
  sort?: string[];
}
