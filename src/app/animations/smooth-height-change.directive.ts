import { Directive, HostBinding, ElementRef, OnChanges, SimpleChanges, Input } from '@angular/core';

@Directive({
  selector: '[appSmoothHeightChange]'
})
export class SmoothHeightChangeDirective implements OnChanges{

  @Input() appSmoothHeightChange: any;
  @HostBinding('@smoothHeight') smoothHeight: any;
  currentHeight: number;

  constructor(private elemento: ElementRef) {
    this.alteraEstadoDaAnimacao();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.alteraEstadoDaAnimacao();
  }

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
