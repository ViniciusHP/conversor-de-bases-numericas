import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

  converterBinarioParaOctal(valorBinario: string): Promise<string> {
    return new Promise((resolve, reject) => {

      let expoente = 0;
      const indiceFinal = valorBinario.length - 1;
      let soma = 0;

      let valorOctalInvertido = '';

      for(let indice = indiceFinal; indice >= 0; indice--) {
        soma += (Number(valorBinario.charAt(indice)) * Math.pow(2, expoente));
        expoente++;

        if(expoente == 3 || indice == 0){
          valorOctalInvertido = valorOctalInvertido.concat(soma.toString());
          expoente = 0;
          soma = 0;
        }
      }

      let valorOctal = '';

      for(let indice = valorOctalInvertido.length - 1; indice >= 0; indice--){
        valorOctal += valorOctalInvertido.charAt(indice);
      }

      resolve(valorOctal);

    });
  }

  converterBinarioParaDecimal(valBinario: string): Promise<string>{
    return new Promise((resolve, reject) => {
        const base = 2;
        let expoente = 0;
        const indiceFinal = valBinario.length - 1;
        let soma = 0;

        for(let indice = indiceFinal; indice >= 0; indice--) {
          const algarismo = Number(valBinario.charAt(indice));
          soma += Math.pow(base, expoente) * algarismo;
          expoente++;
        }

        resolve(soma.toString());
    });
  }

  converterDecimalParaBinario(valDecimal: string): Promise<string>{
    return new Promise((resolve, reject) => {
        let valor = Number(valDecimal);
        const divisor = 2;
        if(valor < 2){
          resolve(valor.toString());
        }

        let valorBinarioInvertido = '';

        while(valor >= divisor) {
          const resto = valor % divisor;
          const quociente = Math.floor(valor / divisor);
          valorBinarioInvertido += resto.toString();

          if(quociente == 1){
            valorBinarioInvertido += quociente.toString();
          }

          valor = quociente;
        }
        let valorBinario = '';

        for(let index = valorBinarioInvertido.length - 1; index >= 0; index--){
          valorBinario += valorBinarioInvertido.charAt(index);
        }

        resolve(valorBinario);
    });
  }
}
