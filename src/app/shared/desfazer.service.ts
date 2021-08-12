import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Interface utilizada para enviar dados para o DesfazerComponent
 */
export interface InfoObjeto {
  texto?: string;
  tempo?: number;
  onClick: () => void;
}

/**
 * Service utilizado para comunicação com o DesfazerComponent
 */
@Injectable({
  providedIn: 'root'
})
export class DesfazerService {

  private opcaoDesfazer = new Subject<InfoObjeto>();
  exibirDesfazer$ = this.opcaoDesfazer.asObservable();

  constructor() { }

  exibirOpcaoDesfazer(info: InfoObjeto): void{
    this.opcaoDesfazer.next(info);
  }
}
