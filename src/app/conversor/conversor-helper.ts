const mapeamentoOctalParaBinario: { [key: string]: string } = {
  '0': '000',
  '1': '001',
  '2': '010',
  '3': '011',
  '4': '100',
  '5': '101',
  '6': '110',
  '7': '111',
};

const mapeamentoDecimalParaHexadecimal:  { [key: string]: string }  = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '10': 'A',
  '11': 'B',
  '12': 'C',
  '13': 'D',
  '14': 'E',
  '15': 'F'
};

const mapeamentoHexadecimalParaBinario: { [key: string]: string } = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
}

const mapeamentoHexadecimalParaDecimal:  { [key: string]: string }  = {
  '0': '0',
  '1': '1',
  '2': '2',
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  'A': '10',
  'B': '11',
  'C': '12',
  'D': '13',
  'E': '14',
  'F': '15'
};

export function inverterOrdemDosNumeros(numero: string): string {
  let numeroInvertido = '';
  for(let index = numero.length - 1; index >= 0; index--){
    numeroInvertido += numero.charAt(index);
  }
  return numeroInvertido;
}

export function converterAlgarismoDecimalParaHexadecimal(digitoDecimal: string): string {
  let valor = mapeamentoDecimalParaHexadecimal[digitoDecimal];

  if(!valor) {
    throw new Error(`O digito '${digitoDecimal}' não é um dígito válido. `);
  }

  return valor;
}

export function converterAlgarismoOctalParaBinario(digitoOctal: string): string {
  let valorBinario = mapeamentoOctalParaBinario[digitoOctal];

  if(!valorBinario) {
    throw new Error(`O digito '${digitoOctal}' não é um dígito válido. `);
  }

  return valorBinario;
}

export function converterAlgarismoHexadecimalParaBinario(digitoHexadecimal: string): string {
  let valorBinario = mapeamentoHexadecimalParaBinario[digitoHexadecimal.toUpperCase()];

  if(!valorBinario) {
    throw new Error(`O digito '${digitoHexadecimal}' não é um dígito Hexadecimal válido.`);
  }

  return valorBinario;
}

export function converterAlgarismoHexadecimalParaDecimal(digitoHexadecimal: string): string {
  let valorDecimal = mapeamentoHexadecimalParaDecimal[digitoHexadecimal.toUpperCase()];

  if(!valorDecimal) {
    throw new Error(`O digito '${digitoHexadecimal}' não é um dígito Hexadecimal válido.`);
  }

  return valorDecimal;
}

export function removerZerosAEsquerda(valor: string): string {

  if(isTodosCaracteresZero(valor)) {
    return valor;
  }

  let valorFinal = '';
  let primeiroAlgarismoEncontrado = false;
  for(let indice = 0; indice < valor.length; indice++){
    let algarismo = valor.charAt(indice);
    if(algarismo != '0' && !primeiroAlgarismoEncontrado){
      primeiroAlgarismoEncontrado = true;
    }

    if(primeiroAlgarismoEncontrado){
      valorFinal = valorFinal.concat(algarismo);
    }
  }
  return valorFinal;
}

export function isTodosCaracteresZero(valor: string) {
  for(let algarismo of valor) {
    if(algarismo != '0'){
      return false;
    }
  }
  return true;
}
