import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

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
          const resto = Math.floor(valor % divisor);
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
