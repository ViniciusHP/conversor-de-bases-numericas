import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { slideUp } from 'src/app/animations/animations';
import { DesfazerService } from '../desfazer.service';

/**
 * Variável auxiliar para identificação de cada objeto Desfazer
 */
let idAtual = 0;

/**
 * Interface utilizada para conter informações da opção de Desfazer
 */
export interface Desfazer {
  id: number;
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

  /**
   * Se increve no DesfazerService, para que seja feita a comunicação entre este componente
   * e o DesfazerService.
   */
  ngOnInit(): void {
    this.subscription = this.desfazerService.exibirDesfazer$.subscribe(
      info => {
        const texto = info.texto ? info.texto : this.textoPadrao;
        const tempo = info.tempo ? info.tempo : this.tempoPadrao;
        const callbackOnClick = info.onClick;

        const objetoDesfazer: Desfazer = {
          id: ++idAtual,
          texto,
          tempo,
          callbackOnClick
        }

        objetoDesfazer.timer = setTimeout(() => this.removerDaLista(objetoDesfazer), tempo);
        this.listaDeObjetosDesfazer.push(objetoDesfazer);
      }
    )
  }

  /**
   * Chama a callback que executa o código que resultará no revertimento de determinada ação
   * @param desfazer - Objeto desfazer
   */
  clickDesfazer(desfazer: Desfazer){
    desfazer.callbackOnClick();
    this.removerDaLista(desfazer);
  }

  /**
   * Remove o objeto desfazer da lista de objetos e limpa o timer do Timeout
   * @param desfazer - Objeto desfazer
   */
  removerDaLista(desfazer: Desfazer): void {
    if(desfazer.timer)
      clearTimeout(desfazer.timer);

    this.listaDeObjetosDesfazer.forEach((d, indice, lista) => {
      if(d.id === desfazer.id){
        lista.splice(indice, 1);
      }
    })
  }

  /**
   * Desfaz a inscrição em DesfazerService e limpa os timers dos objetos Desfazer.
   */
  ngOnDestroy(): void {
    this.listaDeObjetosDesfazer.forEach(d => {
      if(d.timer) clearTimeout(d.timer);
    })
    this.subscription.unsubscribe();
  }

}
