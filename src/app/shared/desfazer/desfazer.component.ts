import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { slideUp } from 'src/app/animations/animations';
import { DesfazerService } from '../desfazer.service';

/**
 * Interface utilizada para conter informações da opção de Desfazer
 */
export interface Desfazer {
  texto: string;
  tempo: number;
  callbackOnClick: () => void;
  timer?: any;
}

/**
 * Componente utilizado para realizar determinada ação para desfazer alguma alteração
 * feita dentro da aplicação
 */
@Component({
  selector: 'app-desfazer',
  templateUrl: './desfazer.component.html',
  styleUrls: ['./desfazer.component.css'],
  animations: [slideUp]
})
export class DesfazerComponent implements OnInit, OnDestroy {

  textoPadrao = 'Desfazer';
  tempoPadrao = 5000;

  subscription: Subscription;

  listaDeObjetosDesfazer: Desfazer[] = [];

  constructor(private desfazerService: DesfazerService) { }

  ngOnInit(): void {
    this.subscription = this.desfazerService.exibirDesfazer$.subscribe(
      info => {
        const texto = info.texto ? info.texto : this.textoPadrao;
        const tempo = info.tempo ? info.tempo : this.tempoPadrao;
        const callbackOnClick = info.onClick;

        const objetoDesfazer: Desfazer = {
          texto,
          tempo,
          callbackOnClick
        }

        const indice = this.listaDeObjetosDesfazer.length;
        objetoDesfazer.timer = setTimeout(() => this.removerDaLista(objetoDesfazer, indice), tempo);

        this.listaDeObjetosDesfazer.push(objetoDesfazer);
      }
    )
  }

  /**
   * Chama a callback que executa o código que resultará no revertimento de determinada ação
   * @param desfazer - Objeto desfazer
   * @param indice - Índice do objeto desfazer dentro da lista de objetos desfazer
   */
  clickDesfazer(desfazer: Desfazer, indice: number){
    desfazer.callbackOnClick();
    this.removerDaLista(desfazer, indice);
  }

  /**
   * Remove o objeto desfazer da lista de objetos e limpa o timer do Timeout
   * @param desfazer - Objeto desfazer
   * @param indice - Índice do objeto desfazer dentro da lista de objetos desfazer
   */
  removerDaLista(desfazer: Desfazer, indice: number): void {
    if(desfazer.timer)
      clearTimeout(desfazer.timer);

    this.listaDeObjetosDesfazer.splice(indice, 1);
  }

  ngOnDestroy(): void {
    this.listaDeObjetosDesfazer.forEach(d => {
      if(d.timer) clearTimeout(d.timer);
    })
    this.subscription.unsubscribe();
  }

}
