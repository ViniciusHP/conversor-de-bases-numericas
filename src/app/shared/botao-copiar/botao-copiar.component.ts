import { Component, Input, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Componente utilizado para obter o valor de um campo de formulário
 * e colocá-lo na área de transferência
 */
@Component({
  selector: 'app-botao-copiar',
  templateUrl: './botao-copiar.component.html',
  styleUrls: ['./botao-copiar.component.css']
})
export class BotaoCopiarComponent implements OnInit, OnDestroy {

  @Input() campoParaCopiarValor: AbstractControl | null;

  private clickObservable$: Observable<Event>;
  private clickSubscription$: Subscription;

  constructor(
    private elementRef: ElementRef,
    private messageService: MessageService
  ) { }

  /**
   * Adiciona o evento de click com debounce para o botão copiar
   */
  ngOnInit(): void {
    this.clickObservable$ = fromEvent(this.elementRef.nativeElement, 'click');
    this.clickSubscription$ = this.clickObservable$.pipe(debounceTime(500))
      .subscribe(() => this.copiar());
  }

  /**
   * Remove a inscrição do evento de click do botão copiar
   */
  ngOnDestroy(): void {
    this.clickSubscription$.unsubscribe();
  }

  /**
   * Estilos definidos para o botão
   */
  get estilosBotao() {
    return {
    'border-top-left-radius': '0px',
    'border-bottom-left-radius': '0px',
    'height': '100%'
    };
  }

  /**
   * Indica se o botão deve ficar habilitado ou desabilitado
   * de acordo com o conteúdo do campo de formulário
   */
  get disabled(): boolean {
    return !(this.campoParaCopiarValor?.value);
  }

  /**
   * Executa a cópia do conteúdo do campo de formulário para a área de transferência
   */
  copiar(): void {
    navigator.clipboard.writeText(this.campoParaCopiarValor?.value)
        .then(() => this.messageService.add({ severity: 'success', detail: 'Valor copiado para área de transferência'}))
        .catch(() => this.messageService.add({ severity: 'error', detail: 'Não foi possível copiar valor para área de transferência'}));
  }
}
