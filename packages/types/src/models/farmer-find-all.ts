import { ApiProperty } from '@nestjs/swagger';
import { Paginated, PaginationParams } from 'shared/pagination';

export class FarmerFindAllQueryParams extends PaginationParams {}

export class FarmerFindAllResponseContent {
  @ApiProperty({
    description: 'Farmer creation date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Farmer document id, like CPF or CNPJ',
  })
  documentId: string;

  @ApiProperty({
    description: 'Farmer id',
  })
  id: number;

  @ApiProperty({
    description: 'Farmer name',
  })
  name: string;

  @ApiProperty({
    description: 'Farmer update date',
  })
  updatedAt: Date;
}

export class FarmerFindAllResponse extends Paginated<FarmerFindAllResponseContent> {}
