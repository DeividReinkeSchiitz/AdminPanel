function CpfValidation(strCpf: string) {
  var soma;
  var resto;
  const currenteCpf = strCpf.replaceAll(".", "").replaceAll("-", "");

  soma = 0;
  if (currenteCpf === "00000000000") {
    return false;
  }

  for (let i = 1; i <= 9; i++) {
    soma = soma + parseInt(currenteCpf.substring(i - 1, i)) * (11 - i);
  }

  resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(currenteCpf.substring(9, 10))) {
    return false;
  }

  soma = 0;

  for (let i = 1; i <= 10; i++) {
    soma = soma + parseInt(currenteCpf.substring(i - 1, i)) * (12 - i);
  }
  resto = soma % 11;

  if (resto === 10 || resto === 11 || resto < 2) {
    resto = 0;
  } else {
    resto = 11 - resto;
  }

  if (resto !== parseInt(currenteCpf.substring(10, 11))) {
    return false;
  }

  return true;
}
export default CpfValidation;
