import { Injectable } from '@nestjs/common';

@Injectable()
export class CPFValidationService {
  execute(value: string): boolean {
    const cpf = value.replaceAll(/\D+/g, '');

    if (cpf.length !== 11 || /(\d)\1{10}/.test(value)) return false;
    const digits = [...value].map((el) => +el);

    const computeVerifierDigit = (position: number) => {
      const sum =
        digits
          .slice(0, position - 12)
          .reduce((sum, el, index) => sum + el * (position - index), 0) * 10;

      return (sum % 11) % 10;
    };

    return (
      computeVerifierDigit(10) === digits[9] &&
      computeVerifierDigit(11) === digits[10]
    );
  }
}
