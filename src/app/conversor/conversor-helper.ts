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

export function converterAlgarismoOctalParaBinario(digitoOctal: string) {
  let valorBinario = mapeamentoOctalParaBinario[digitoOctal];

  if(!valorBinario) {
    throw new Error(`O digito '${digitoOctal}' não é um dígito válido. `);
  }

  return valorBinario;
}

export function removerZerosAEsquerda(valor: string) {
  let valorFinal = '';
  let primeiroAlgarismoEncontrado = false;
  for(let indice = 0; indice < valor.length; indice++){
    let algarismo = valor.charAt(indice);
    if(algarismo != '0' && !primeiroAlgarismoEncontrado){
      primeiroAlgarismoEncontrado = true;
      console.log(`Algarismo diferente de 0 e é primeiro algarismo: ${algarismo}`);
    }

    if(primeiroAlgarismoEncontrado){
      valorFinal = valorFinal.concat(algarismo);
      console.log(`Algarismo: ${algarismo}`);
    }
  }
  return valorFinal;
}
