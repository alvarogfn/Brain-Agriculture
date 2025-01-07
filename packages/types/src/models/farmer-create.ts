import { ApiProperty } from '@nestjs/swagger';

export class FarmerCreatePathParams {}

export class FarmerCreateQueryParams {}

export class FarmerCreateRequestBody {
  @ApiProperty({
    description: 'Farmer document id, like CPF or CNPJ',
  })
  documentId: string;

  @ApiProperty({
    description: 'Farmer name',
  })
  name: string;
}

export class FarmerCreateResponse {
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
