export function inverterOrdemDosNumeros(numero: string): string {
  let numeroInvertido = '';
  for(let index = numero.length - 1; index >= 0; index--){
    numeroInvertido += numero.charAt(index);
  }
  return numeroInvertido;
}

export function converterAlgarismoDecimalParaHexadecimal(digitoDecimal: string): string {

  const conjuntoHexadecimal:  { [key: string]: string }  = {
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
  }

  let valor = conjuntoHexadecimal[digitoDecimal];

  if(!valor) {
    throw new Error(`O digito '${digitoDecimal}' não é um dígito válido. `);
  }

  return valor;
}
