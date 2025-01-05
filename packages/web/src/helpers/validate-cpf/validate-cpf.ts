export function validateCPF(cpf: string) {
  const sanitizedCPF = cpf.replaceAll(/\D+/g, '');

  if (sanitizedCPF.length !== 11 || /(\d)\1{10}/.test(cpf)) return false;
  const digits = [...cpf].map((el) => +el);

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
