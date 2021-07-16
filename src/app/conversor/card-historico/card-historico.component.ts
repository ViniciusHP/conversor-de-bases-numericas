import { Historico } from './../historico.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-historico',
  templateUrl: './card-historico.component.html',
  styleUrls: ['./card-historico.component.css']
})
export class CardHistoricoComponent implements OnInit {

  @Input() historico: Historico;
  @Output() onBotaoFechar = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {

  }

  emitBotaoFechar(): void {
    this.onBotaoFechar.emit();
  }

}
