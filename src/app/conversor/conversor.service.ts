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
}