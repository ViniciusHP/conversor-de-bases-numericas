import { Directive, HostBinding, ElementRef, OnChanges, SimpleChanges, Input, OnInit } from '@angular/core';

/**
 * Diretiva utilizada para controlar a animação 'smoothHeight'
 */
@Directive({
  selector: '[appSmoothHeightChange]'
})
export class SmoothHeightChangeDirective implements OnInit, OnChanges{

  @Input() appSmoothHeightChange: any;
  @HostBinding('@smoothHeight') smoothHeight: any;
  currentHeight: number;

  constructor(private elemento: ElementRef) {}

  ngOnInit(): void {
    this.alteraEstadoDaAnimacao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.alteraEstadoDaAnimacao();
  }

  /**
   * Método utilizado para modificar o parâmetro da altura da animação 'smoothHeight'
   * e o estado da animação
   */
  alteraEstadoDaAnimacao() {
    this.currentHeight = this.elemento.nativeElement.clientHeight;
    this.smoothHeight = {
      value: this.appSmoothHeightChange,
      params: {
        lastHeight: this.currentHeight
      }
    }
  }
}
