import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-botao-copiar',
  templateUrl: './botao-copiar.component.html',
  styleUrls: ['./botao-copiar.component.css']
})
export class BotaoCopiarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  get estilosBotao() {
    return {
    'border-top-left-radius': '0px',
    'border-bottom-left-radius': '0px',
    'height': '100%'
    };
  }
}
