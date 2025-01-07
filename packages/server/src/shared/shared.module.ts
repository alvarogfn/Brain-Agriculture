import { Module } from '@nestjs/common';

import { CNPJValidationService } from './cnpj-validation/cnpj-validation.service';
import { CPFValidationService } from './cpf-validation/cpf-validation.service';
import { PaginateService } from './paginate/paginate.service';

@Module({
  exports: [CPFValidationService, CNPJValidationService, PaginateService],
  providers: [CPFValidationService, CNPJValidationService, PaginateService],
})
export class SharedModule {}
