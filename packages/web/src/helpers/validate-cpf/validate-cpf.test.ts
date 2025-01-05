import { validateCPF } from './validate-cpf';

describe('[Helpers]: validateCPF', () => {
  it.each([
    { cpf: '66706204030', expected: true },
    { cpf: '66706204031', expected: false },
    { cpf: '21649143095', expected: true },
    { cpf: '21641233095', expected: false },
    { cpf: '47341424087', expected: true },
    { cpf: '12345678910', expected: false },
    { cpf: '1234', expected: false },
    { cpf: 'sbasdasfsd', expected: false },
  ])('should return $expected when CPF is $cpf', ({ cpf, expected }) => {
    expect(validateCPF(cpf)).toEqual(expected);
  });
});
