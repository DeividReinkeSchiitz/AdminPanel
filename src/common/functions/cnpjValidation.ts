const validarCNPJ = (cnpj: string) => {
  let currenteCnpj = cnpj
    .replaceAll(".", "")
    .replaceAll("-", "")
    .replaceAll("/", "");

  currenteCnpj = currenteCnpj.replace(/[^\d]+/g, "");

  if (currenteCnpj === "") return false;

  if (currenteCnpj.length !== 14) return false;

  // Elimina currenteCnpjs invalidos conhecidos
  if (
    currenteCnpj === "00000000000000" ||
    currenteCnpj === "11111111111111" ||
    currenteCnpj === "22222222222222" ||
    currenteCnpj === "33333333333333" ||
    currenteCnpj === "44444444444444" ||
    currenteCnpj === "55555555555555" ||
    currenteCnpj === "66666666666666" ||
    currenteCnpj === "77777777777777" ||
    currenteCnpj === "88888888888888" ||
    currenteCnpj === "99999999999999"
  )
    return false;

  // Valida DVs
  let tamanho = currenteCnpj.length - 2;
  let numeros = currenteCnpj.substring(0, tamanho);
  let digitos = currenteCnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma = soma + parseFloat(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseFloat(digitos.charAt(0))) return false;

  tamanho = tamanho + 1;
  numeros = currenteCnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseFloat(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseFloat(digitos.charAt(1))) return false;

  return true;
};

export default validarCNPJ;
